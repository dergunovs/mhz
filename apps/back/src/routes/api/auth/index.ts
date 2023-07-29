import bcrypt from 'bcryptjs';

import { IFastifyInstance } from '../../../interface/index.js';
import Manager from '../../../models/manager.js';

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Body: { email: string; password: string } }>('/login', async function (request, reply) {
    const { email, password } = request.body;

    const isManagers = !!(await Manager.find()).length;

    if (!isManagers) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const manager = new Manager({
        email,
        password: hashedPassword,
        role: 'admin',
      });

      await manager.save();

      return;
    }

    const foundManager = await Manager.findOne({ email });

    if (foundManager) {
      try {
        const valid = await bcrypt.compare(password, foundManager.password);
        if (!valid) reply.code(401).send({ message: 'Пароль неправильный' });

        const managerInfo = {
          _id: foundManager._id,
          first_name: foundManager.first_name,
          last_name: foundManager.last_name,
          email: foundManager.email,
        };

        const token = fastify.jwt.sign(managerInfo, { expiresIn: '9h' });
        const manager = { ...managerInfo, token };

        reply.code(200).send(manager);
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
      return reply.code(200).send({ message: 'checked' });
    } catch (err) {
      reply.code(403).send({ message: 'Нужна авторизация' });
    }
  });
}
