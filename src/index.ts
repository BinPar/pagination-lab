import recalculateColumnConfig from './recalculateColumnConfig';
import { getSettings, updateSettings } from './settings';
import getDomUI from './getDomUI';
import setupGeneralEvents from './setupGeneralEvents';
import setupButtonsEvents from './setupButtonsEvents';
import setupSelection from './setupSelection';

/**
 * All the system is setup when the window loads
 */
const onWindowLoad = (): void => {
  const domUI = getDomUI();
  setupGeneralEvents();
  setupButtonsEvents();
  setupSelection();
  document.documentElement.style.setProperty(
    '--fontSize',
    `${getSettings().currentFontSize}px`,
  );

  /**
   * The click toggles the mode (read mode or buttons)
   */
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

  /**
   * When a new font is loaded we need to recalculate the colum configuration
   */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then((): void => {
      recalculateColumnConfig(true);
    }).catch((err): void => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
  }

  /**
   * Events to detect when the zoom animation is ended
   */
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
          /**
           * If we wait to the next screen render frame: 
           * it avoids the visual jump on the scroll
           * works really well!!!
           */
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

/**
 * We need to recalculate the columns on resize
 */
window.addEventListener('resize', (): void => {
  recalculateColumnConfig(true);
});

/**
 * Main entry point
 */
window.addEventListener('load', onWindowLoad);