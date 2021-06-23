import Hapi from '@hapi/hapi';
import routes from './routes';

export const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
});

server.events.on('stop', () => {
  console.log('Server stopped');
});

export const getServerFactory = async () => {
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
