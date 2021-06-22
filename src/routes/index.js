import part1 from './part1';
const defaultRoute = {
  path: '/',
  method: '*',
  handler: (req, res) => {
    return { message: 'OK' };
  },
};
export default [].concat(defaultRoute, part1);
