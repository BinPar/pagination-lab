import * as liveServer from 'live-server';

const params: liveServer.LiveServerParams = {
  port: 3000,
  root: './web',
  open: false,
  wait: 0,
  mount: [
    ['/src', './src'],
  ],
  logLevel: 2,
  file: 'index.html',
};

liveServer.start(params);
