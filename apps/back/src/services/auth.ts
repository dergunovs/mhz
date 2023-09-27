import bcrypt from 'bcryptjs';
import type { IUserToken, ILoginData, ISignUpData } from 'mhz-contracts';

import Manager from '../models/manager.js';
import Customer from '../models/customer.js';

import { IAuthService } from '../interface/index.js';

export const authService: IAuthService = {
  check: async (request: { jwtVerify: () => Promise<void> }) => {
    await request.jwtVerify();
  },

  login: async (loginData: ILoginData, sign: (payload: IUserToken, options: object) => string) => {
    const { email, password, role } = loginData;

    const foundUser =
      role === 'manager' ? await Manager.findOne({ email }).exec() : await Customer.findOne({ email }).exec();

    if (!foundUser?.password) {
      return { user: undefined, isUserNotFound: true, isWrongPassword: false };
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (!isValidPassword) {
      return { user: undefined, isUserNotFound: false, isWrongPassword: true };
    }

    const user: IUserToken = {
      _id: foundUser._id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      role,
    };

    const token = sign(user, { expiresIn: '9h' });

    foundUser.dateLoggedIn = new Date();
    await foundUser.save();

    return { user: { ...user, token }, isUserNotFound: false, isWrongPassword: false };
  },

  setup: async (managerToCreate: ISignUpData) => {
    const managers = await Manager.find().lean().exec();

    if (managers.length) return true;

    const manager = new Manager(managerToCreate);

    if (!manager.password) return true;

    manager.password = await bcrypt.hash(manager.password, 10);

    await manager.save();

    return false;
  },
};
