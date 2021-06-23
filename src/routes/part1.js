import Joi from 'joi';
export default [
  {
    path: '/part1',
    method: 'post',
    handler: (req, res) => {
      let flatten = Object.keys(req.payload)
        .reduce((r, k) => {
          return r.concat(req.payload[k]);
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
    options: {
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
      },
    },
  },
];
