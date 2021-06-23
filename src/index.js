import * as Server from './server';

Server.getServerFactory().then((server) => server.start());
