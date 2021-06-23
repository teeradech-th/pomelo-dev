import Hapi from '@hapi/hapi';
import Vision from '@hapi/vision';
import HapiReactViews from 'hapi-react-views';
import routes from './routes';
// import register from '@babel/register';

export const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
});

// register({ plugins: ['transform-react-jsx'] });

server.events.on('stop', () => {
  console.log('Server stopped');
});

server.route(routes);

export const getServerFactory = async () => {
  await server.initialize();

  return server;
};

export const start = async () => {
  await server.register(Vision);
  server.views({
    engines: { jsx: HapiReactViews },
    relativeTo: __dirname,
    path: `./pages`,
  });

  await server.start();
  console.log(`Server started listening on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
