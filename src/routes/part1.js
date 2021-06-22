export default [
  {
    path: '/part1',
    method: 'POST',
    handler: (req, res) => {
      return req.params;
    },
  },
];
