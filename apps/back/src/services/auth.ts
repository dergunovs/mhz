import { FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import { IManager } from 'mhz-types';

import Manager from '../models/manager.js';
import Customer from '../models/customer.js';

import { IUserToken, ILoginData } from '../interface/index.js';

export const authService = {
  check: async (request: FastifyRequest) => {
    await request.jwtVerify();
  },

  login: async (
    loginData: ILoginData,
    sign: (payload: Omit<IUserToken, 'iat' | 'exp' | 'token'>, options: object) => string
  ) => {
    const { email, password, role } = loginData;

    const foundUser =
      role === 'manager' ? await Manager.findOne({ email }).exec() : await Customer.findOne({ email }).exec();

    if (!foundUser?.firstName || !foundUser?.lastName) {
      return { user: undefined, isUserNotFound: true, isWrongPassword: false };
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (!isValidPassword) {
      return { user: undefined, isUserNotFound: false, isWrongPassword: true };
    }

    const user = {
      _id: foundUser._id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      role,
    };

    const token = sign(user, { expiresIn: '9h' });

    foundUser.dateLoggedIn = new Date();
    await foundUser.save();

    return { user: { ...user, token }, isUserFound: false, isWrongPassword: false };
  },

  setup: async (managerToCreate: IManager) => {
    const managers = await Manager.find().lean().exec();

    if (managers.length) return true;

    const manager = new Manager(managerToCreate);

    manager.password = await bcrypt.hash(manager.password, 10);

    await manager.save();

    return false;
  },
};
