import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());

import { init } from '../src/server';
describe('Server is running', () => {
  let server;

  beforeEach(async () => {
    console.log(init);
    server = await init();
    await server.start();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/',
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal({ message: 'OK' });
  });
});
