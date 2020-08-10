import * as log from 'loglevel';

const onWindowLoad = (): void => {
  // eslint-disable-next-line no-console
  log.warn('Pagination initialized!');
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  const chapterWidth = document.body.scrollWidth;  
  document.documentElement.style.setProperty('--chapterWidth', `${chapterWidth}px`);
}

window.addEventListener("load", onWindowLoad);