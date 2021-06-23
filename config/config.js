'use strict';

const Confidence = require('confidence');

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
internals.config = {
  $meta: 'App configuration file',
  port: {
    web: {
      $filter: 'env',
      test: 3003,
      production: process.env.PORT,
      $default: 3000,
    },
  },
  baseUrl: {
    $filter: 'env',
    $meta: 'application baseUrl',
    production: 'http://localhost:3000',
    $default: 'http://127.0.0.1:3000',
  },
  vision: require('@hapi/vision'),
  good: {
    ops: {
      interval: 1000,
    },
    reporters: {
      myConsoleReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }],
        },
        {
          module: 'good-console',
        },
        'stdout',
      ],
    },
  },
};

internals.store = new Confidence.Store(internals.config);

exports.get = function (key) {
  return internals.store.get(key, internals.criteria);
};

exports.meta = function (key) {
  return internals.store.meta(key, internals.criteria);
};
