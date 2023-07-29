import { buildApp, AppOptions } from './app.js';

import dotenv from 'dotenv';
dotenv.config();

const options: AppOptions = {
  logger: true,
};

const start = async () => {
  const app = await buildApp(options);
  const port = Number(process.env.PORT);

  try {
    await app.listen({ port, host: 'localhost' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
