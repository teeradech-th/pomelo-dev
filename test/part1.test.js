import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());

// import input from './data/input-part1.json';

import { getServerFactory } from '../src/server';
describe('Part 1', () => {
  let server;

  beforeEach(async () => {
    server = await getServerFactory();
    await server.start();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/part1',
    });
    expect(res.statusCode).to.equal(200);
  });
});
