export default [
  {
    path: '/part2',
    method: 'get',
    handler: (req, res) => {
      return res.view('part2', {
        title: `Node.js on Github`,
      });
    },
  },
];
