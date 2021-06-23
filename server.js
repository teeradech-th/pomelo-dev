'use strict';

const Manifest = require('./config/manifest');
const Glue = require('@hapi/glue');
const HapiReactViews = require('hapi-react-views');

const composeOptions = {
  relativeTo: __dirname,
};

/**
 * Manual register babel which required by hapi-react-views
 */
require('@babel/register')({
  presets: ['@babel/preset-react', '@babel/preset-env'],
});

/**
 * Composing manifest and start server
 */
const compose = async () => {
  try {
    const server = await Glue.compose(Manifest.get('/'), composeOptions);
    await server.register(Vision);
    server.views({
      engines: {
        jsx: HapiReactViews,
      },
      relativeTo: __dirname,
      path: 'app/views/',
    });
    await server.start();
    console.log(server.plugins.Vision);
    console.info(`Server started at ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
compose();
