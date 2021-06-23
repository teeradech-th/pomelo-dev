export default [
  {
    path: '/part1',
    method: '*',
    handler: (req, res) => {
      return { message: 'part1' };
    },
  },
];
