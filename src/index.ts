import * as log from 'loglevel';

const onWindowLoad = (): void => {
  // eslint-disable-next-line no-console
  log.warn('Pagination initialized!');
}

window.addEventListener("load", onWindowLoad);
