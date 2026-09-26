import { buildApp, AppOptions } from './app.js';

const options: AppOptions = { logger: true };

const app = await buildApp(options);
const port = Number(process.env.PORT);

try {
  await app.listen({ port, host: 'localhost' });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
