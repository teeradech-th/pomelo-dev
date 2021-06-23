const Hapi = require('@hapi/hapi');
const Code = require('@hapi/code');
const expect = Code.expect;
const Lab = require('@hapi/lab');
const lab = (exports.lab = Lab.script());

lab.describe('To check server is running properly', () => {
  let server;
  lab.beforeEach(async () => {
    server = new Hapi.Server({
      host: 'localhost',
      port: process.env.PORT,
    });
    await server.register([require('../app/routes/index.js')]);
    await server.start();
  });

  lab.afterEach(async () => {
    await server.stop();
  });

  lab.it('responds status 200 and with message OK', async () => {
    const response = await server.inject({
      method: 'get',
      url: '/',
    });
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal({ message: 'OK' });
  });
});
