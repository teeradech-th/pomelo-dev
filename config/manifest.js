'use strict';

const Confidence = require('confidence');
const Config = require('./config');
/**
 * Confidence criteria
 */
const internals = {
  criteria: {
    env: process.env.NODE_ENV,
  },
};

/**
 * Confidence document object
 */
internals.manifest = {
  $meta: 'Pomelo Technical Challenge - App manifest document',
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.PORT,
  },
  register: {
    plugins: [
      /**
       * Log connector
       */
      {
        plugin: 'good',
        options: Config.get('/good'),
      },

      /**
       * @Hapi/vision for view
       */
      {
        plugin: '@hapi/vision',
      },

      /**
       * Static file and directory handlers
       */
      {
        plugin: '@hapi/inert',
      },

      /**
       * Api document generator
       */
      {
        plugin: 'hapi-swagger',
      },

      /**
       * Start routing
       */
      {
        plugin: './app/routes/index.js',
      },
      {
        plugin: './app/routes/challenge.js',
      },
    ],
  },
};

internals.store = new Confidence.Store(internals.manifest);

exports.get = function (key) {
  return internals.store.get(key, internals.criteria);
};

exports.meta = function (key) {
  return internals.store.meta(key, internals.criteria);
};
