import { buildApp, AppOptions } from './app.js';

import dotenv from 'dotenv';
dotenv.config();

const options: AppOptions = {
  logger: true,
};

const start = async () => {
  const app = await buildApp(options);

  try {
    await app.listen({ port: 5000, host: 'localhost' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
