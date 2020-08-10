import recalculateColumnConfig from './recalculateColumnConfig';

let currentFontSize = 18;

const onWindowLoad = (): void => {
  document.documentElement.style.setProperty(
    '--fontSize',
    `${currentFontSize}px`,
  );
  const increaseFontButton = document.body.querySelector(
    'body > .buttons > .increaseFontButton',
  );
  const decreaseFontButton = document.body.querySelector(
    'body > .buttons > .decreaseFontButton',
  );
  const updateFontInfo = (): void => {
    document.documentElement.style.setProperty(
      '--fontSize',
      `${currentFontSize}px`,
    );
    recalculateColumnConfig(currentFontSize);
  };
  increaseFontButton?.addEventListener('click', (): void => {
    if (currentFontSize < 100) {
      currentFontSize += 2;
      updateFontInfo();
    }
  });
  decreaseFontButton?.addEventListener('click', (): void => {
    if (currentFontSize > 8) {
      currentFontSize -= 2;
      updateFontInfo();
    }
  });
  recalculateColumnConfig(currentFontSize);
  setTimeout((): void => recalculateColumnConfig(currentFontSize), 1000);
};

window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', (): void =>
  recalculateColumnConfig(currentFontSize),
);
