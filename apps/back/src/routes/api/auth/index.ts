import bcrypt from 'bcryptjs';

import { IFastifyInstance } from '../../../interface/index.js';
import User from '../../../models/user.js';

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Body: { email: string; password: string } }>('/login', async function (request, reply) {
    const { email, password } = request.body;

    const isUsers = !!(await User.find()).length;

    if (!isUsers) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hashedPassword,
        role: 'admin',
      });

      await user.save();

      return;
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      try {
        const valid = await bcrypt.compare(password, foundUser.password);
        if (!valid) reply.code(401).send({ message: 'Пароль неправильный' });

        const userInfo = {
          _id: foundUser._id,
          first_name: foundUser.first_name,
          last_name: foundUser.last_name,
          role: foundUser.role,
          email: foundUser.email,
          isEmailConfirmed: foundUser.isEmailConfirmed,
        };

        const token = fastify.jwt.sign(userInfo, { expiresIn: '9h' });
        const user = { ...userInfo, token };

        reply.code(200).send(user);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    } else {
      reply.code(404).send({ message: 'Пользователь не найден' });
    }
  });

  fastify.get('/check', async function (request, reply) {
    try {
      await request.jwtVerify();
      return reply.code(200).send({ message: 'Ok' });
    } catch (err) {
      reply.code(403).send({ message: 'Нужна авторизация' });
    }
  });
}
