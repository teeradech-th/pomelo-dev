import Hapi from '@hapi/hapi';
import routes from './routes';

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

export const init = async () => {
  await server.initialize();
  server.route(routes);
  return server;
};

export const start = async () => {
  await server.start();
  console.log(`Server started listening on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
