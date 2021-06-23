'use strict';

const Path = require('path');

exports.plugin = {
  pkg: require(Path.join(process.cwd(), '/package.json')),
  name: 'challenges',
  register: async (server, options) => {
    const Controllers = {
      challenges: {
        part1: require('../controllers/challenges/part1.js'),
      },
    };
    server.route([
      {
        method: 'POST',
        path: '/challenges/part-1',
        config: Controllers.challenges.part1.submit,
      },
    ]);
  },
};
