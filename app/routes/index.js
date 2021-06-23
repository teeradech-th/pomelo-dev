'use strict';

const Path = require('path');

exports.plugin = {
  pkg: require(Path.join(process.cwd(), '/package.json')),
  name: 'index',
  register: async (server, options) => {
    const Controllers = {
      index: require('../controllers/index.js'),
    };
    server.route([
      {
        method: 'GET',
        path: '/',
        config: Controllers.index.home,
      },
    ]);
  },
};
