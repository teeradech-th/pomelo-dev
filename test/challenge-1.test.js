const Hapi = require('@hapi/hapi');
const Code = require('@hapi/code');
const expect = Code.expect;
const Lab = require('@hapi/lab');
const lab = (exports.lab = Lab.script());
const input = require('./data/input-part1');
const output = require('./data/output-part1');
const _ = require('lodash');

lab.describe('To check server is running properly', () => {
  let server;

  lab.beforeEach(async () => {
    server = new Hapi.Server({
      host: 'localhost',
      port: process.env.PORT,
    });
    await server.register([require('../app/routes/challenge.js')]);
    await server.start();
  });

  lab.afterEach(async () => {
    await server.stop();
  });

  lab.it('should return error when put wrong schema', async () => {
    const response = await server.inject({
      method: 'post',
      url: '/challenges/part-1',
      payload: {
        x: [{ a: 'a' }],
      },
    });
    expect(response.statusCode).to.equal(400);
  });

  lab.it('should return 200 when using right schema', async () => {
    const response = await server.inject({
      method: 'post',
      url: '/challenges/part-1',
      payload: input,
    });
    expect(response.statusCode).to.equal(200);
  });

  lab.it('should return hierachied schema', async () => {
    const response = await server.inject({
      method: 'post',
      url: '/challenges/part-1',
      payload: input,
    });
    expect(_.isEqual(response.result, output)).to.be.true();
  });
});
