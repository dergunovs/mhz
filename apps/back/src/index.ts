import dotenv from 'dotenv';
import { buildApp, AppOptions } from './app.js';

dotenv.config({ quiet: true });

const options: AppOptions = { logger: true };

const start = async () => {
  const app = await buildApp(options);
  const port = Number(process.env.PORT);

  try {
    await app.listen({ port, host: 'localhost' });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
