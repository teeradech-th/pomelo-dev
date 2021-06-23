'use strict';

const Manifest = require('./config/manifest');
const Glue = require('@hapi/glue');
const HapiReactViews = require('hapi-react-views');

const composeOptions = {
  relativeTo: __dirname,
};

/**
 * Composing manifest and start server
 */
const compose = async () => {
  try {
    const server = await Glue.compose(Manifest.get('/'), composeOptions);
    server.views({
      engines: {
        jsx: HapiReactViews,
      },
      relativeTo: __dirname,
      path: './app/views',
    });
    await server.start();
    console.info(`Server started at ${server.info.uri}`);
    return server;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

exports.default = compose;
