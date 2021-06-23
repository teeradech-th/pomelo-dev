'use strict';

const Joi = require('joi');

const ElementSchema = Joi.object()
  .pattern(
    Joi.string().regex(/\d+/),
    Joi.array().items(
      Joi.object({
        id: Joi.number().required(),
        title: Joi.string().required(),
        level: Joi.number().required().min(0),
        children: Joi.array().items(Joi.link('#ElementSchema')),
        parent_id: Joi.number().allow(null),
      }).id('ElementSchema')
    )
  )
  .label('ElementSchema');

exports.submit = {
  description: 'Challenge part 1',
  validate: {
    payload: ElementSchema,
    failAction: (_request, h, error) => {
      return h
        .response({ message: error.details[0].message.replace(/['"]+/g, '') })
        .code(400)
        .takeover();
    },
  },
  tags: ['api'],
  notes: [
    "To assigned object to parent's children array reference using parent_id",
  ],
  plugins: {
    'hapi-swagger': {
      payloadType: 'json',
      parameters: [
        {
          name: 'Element',
          in: 'payload',
          type: Object,
        },
      ],
      responses: {
        200: { schema: ElementSchema },
      },
    },
  },
  handler: (request, h) => {
    let flatten = Object.keys(request.payload).reduce((r, key) => {
      return r.concat(request.payload[key]);
    }, []);

    flatten.forEach((item, i) => {
      item.children = flatten.filter(
        (children) => children.parent_id === item.id
      );
      flatten = flatten.filter((children) => children.parent_id !== item.id);
    });
    return h.response(flatten);
  },
};
