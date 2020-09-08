import recalculateColumnConfig from './recalculateColumnConfig';
import { getSettings, updateSettings } from './settings';
import getDomUI from './getDomUI';
import setupGeneralEvents from './setupGeneralEvents';
import updateFontInfo from './updateFontInfo';
import setupButtonsEvents from './setupButtonsEvents';

const onWindowLoad = (): void => {
  
  const domUI = getDomUI();

  setupGeneralEvents();
  setupButtonsEvents();

  document.documentElement.style.setProperty(
    '--fontSize',
    `${getSettings().currentFontSize}px`,
  );

  document.body.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    if (getSettings().animateEnabled) {
      updateSettings({ readMode: !getSettings().readMode });
      if (domUI.zoomPanel && domUI.buttonsPanel) {
        if (!getSettings().verticalScroll) {
          updateSettings({ animateEnabled: false });
          document.documentElement.style.setProperty(
            '--viewerSnapType',
            `none`,
          );
          if (getSettings().readMode) {
            const scrollFix = (document.body.scrollLeft * -1) / 3;
            updateSettings({ scrollFix });
            document.documentElement.style.setProperty(
              '--horizontalScrollFix',
              `${getSettings().scrollFix}px`,
            );
          } else {
            const scrollFix = document.body.scrollLeft * 0.25;
            updateSettings({ scrollFix });
            document.documentElement.style.setProperty(
              '--horizontalScrollFix',
              `${getSettings().scrollFix}px`,
            );
          }
          updateSettings({ handleZoomAnimation: true });
          domUI.zoomPanel.className = `zoomPanel${getSettings().readMode ? ' zoom' : ''}`;
        }
        domUI.buttonsPanel.className = `buttons${getSettings().readMode ? ' zoom' : ''}`;
      }
    }
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then((): void => {
      recalculateColumnConfig(true);
    });
  }

  document.body
    .querySelectorAll<HTMLButtonElement>('body > .buttons > .selectTypography')
    .forEach((button): void => {
      button?.addEventListener('click', (ev: Event): void => {
        ev.preventDefault();
        ev.stopPropagation();
        updateSettings({ currentFont: button.value });
        document.body.className = `viewer epub ${getSettings().currentFont}${
          getSettings().verticalScroll ? ' vertical' : ''
          }`;
        updateFontInfo();
      });
    });

  [
    'webkitTransitionEnd',
    'otransitionend',
    'oTransitionEnd',
    'msTransitionEnd',
    'transitionend',
  ].forEach((eventName): void => {
    domUI.zoomPanel?.addEventListener(
      eventName,
      (): void => {
        if (getSettings().handleZoomAnimation) {
          updateSettings({ handleZoomAnimation: false });
          const newScrollX = document.body.scrollLeft - getSettings().scrollFix;
          document.body.scrollTo(newScrollX, 0);
          updateSettings({ scrollFix: 0 });
          document.documentElement.style.setProperty('--animationSpeed', `0s`);
          document.documentElement.style.setProperty(
            '--horizontalScrollFix',
            `${getSettings().scrollFix}px`,
          );
          recalculateColumnConfig(false);
          window.requestAnimationFrame((): void => {
            document.documentElement.style.setProperty(
              '--animationSpeed',
              `0.5s`,
            );
            document.documentElement.style.setProperty(
              '--viewerSnapType',
              `x mandatory`,
            );
            updateSettings({ animateEnabled: true });
            document.body.scrollTo(newScrollX, 0);
          });
        }
      },
      false,
    );
  });
  if (domUI.zoomPanel) {
    domUI.zoomPanel.style.marginTop = '0';
  }
};

window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', (): void => {
  recalculateColumnConfig(true);
});
