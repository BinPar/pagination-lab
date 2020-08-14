/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import * as liveServer from 'live-server';
import * as ngrok from 'ngrok';

const params: liveServer.LiveServerParams = {
  port: 3000,
  root: './web',
  open: false,
  wait: 0,
  ignore: '/src,/dist',
  mount: [['/src', './src']],
  logLevel: 2,
  file: 'index.html',
};

liveServer.start(params);

const runNgrok = async (): Promise<void> => {
  const url = await ngrok.connect(3000);
  console.log(`Listening on: ${url}`);
};

runNgrok();