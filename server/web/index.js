import Pug from 'pug';
import Path from 'path';

const register = function (server, options) {
  server.views({
    engines: {
      pug: Pug,
    },
    relativeTo: Path.join(process.cwd(), 'server/web'),
    path: '.',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.view('index');
    },
  });

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: Path.join(process.cwd(), 'client/build/'),
        listing: false,
        index: true,
      },
    },
  });
};

export default {
  plugin: {
    register,
    name: 'web',
    dependencies: ['vision'],
  },
};
