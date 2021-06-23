import part1 from './part1';
import part2 from './part2';
const defaultRoute = {
  path: '/',
  method: '*',
  handler: (req, res) => {
    return { message: 'OK' };
  },
};
export default [].concat(defaultRoute, part1, part2);
