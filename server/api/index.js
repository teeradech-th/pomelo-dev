const register = (server, options) => {
  server.route({
    method: 'GET',
    path: '/',
    options: {
      handler: (request, h) => {
        return {
          message: 'OK',
        };
      },
    },
  });
};

export default {
  plugin: {
    register,
    name: 'api',
  },
};
