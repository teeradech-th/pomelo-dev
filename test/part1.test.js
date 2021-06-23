import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
const lab = (exports.lab = Lab.script());
import input from './data/input-part1.json';
import output from './data/output-part1.json';

import { getServerFactory } from '../src/server';
lab.describe('To check server is running properly', () => {
  let server;

  lab.beforeEach(async () => {
    server = await getServerFactory();
    await server.start();
  });

  lab.afterEach(async () => {
    await server.stop();
  });

  lab.it('should return error when put wrong schema', async () => {
    const response = await server.inject({
      method: 'post',
      url: '/part1',
      payload: {
        x: [{ a: 'a' }],
      },
    });
    expect(response.statusCode).to.equal(400);
  });

  lab.it('should return 200 when using right schema', async () => {
    const response = await server.inject({
      method: 'post',
      url: '/part1',
      payload: input,
    });
    expect(response.statusCode).to.equal(200);
  });

  // Still figuring out how to compare object with unordered key by hapi/lap
  lab.it.skip('should return hierachied schema', async () => {
    const response = await server.inject({
      method: 'post',
      url: '/part1',
      payload: input,
    });
    expect(response.result).to.shallow.equal(output);
  });
});
