'use strict';

const Joi = require('joi');

exports.part2 = {
  description: 'Challenge part 1',
  validate: {
    payload: Joi.object().pattern(
      /\d+/,
      Joi.array().items(
        Joi.object({
          id: Joi.number().required(),
          title: Joi.string().required(),
          level: Joi.number().required().min(0),
          children: Joi.array().items(Joi.link('item')),
          parent_id: Joi.number().allow(null),
        }).id('item')
      )
    ),
    failAction: (_request, h, error) => {
      return h
        .response({ message: error.details[0].message.replace(/['"]+/g, '') })
        .code(400)
        .takeover();
    },
  },
  handler: (request, _h) => {
    let flatten = Object.keys(request.payload)
      .reduce((r, key) => {
        return r.concat(request.payload[key]);
      }, [])
      .sort((a, b) => {
        // sort level descending
        if (a.level === b.level) {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.level > b.level ? -1 : 1;
        }
      });

    flatten.forEach((item, i) => {
      item.children = flatten.filter(
        (children) => children.parent_id === item.id
      );
      flatten = flatten.filter((children) => children.parent_id !== item.id);
    });
    return flatten;
  },
};
