import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
const lab = (exports.lab = Lab.script());

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

  lab.it('responds status 200 and with message OK', () => {
    server.inject(
      {
        method: 'get',
        url: '/',
      },
      (response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal({ message: 'OK' });
      }
    );
  });
});
