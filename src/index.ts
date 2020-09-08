import recalculateColumnConfig from './recalculateColumnConfig';
import { getSettings, updateSettings } from './settings';

let pageNumberBtn: HTMLElement | null;

const onBodyScroll = (ev: Event): void => {
  if (getSettings().animateEnabled && !getSettings().verticalScroll) {
    let { columnWidth } = getSettings();
    if (!getSettings().readMode) {
      columnWidth *= 0.75;
    }
    const currentColumn = Math.round(
      (document.body.scrollLeft - getSettings().scrollFix) / columnWidth,
    );
    if (currentColumn < getSettings().pagesPerColumn.length) {
      updateSettings({ currentPage: getSettings().pagesPerColumn[currentColumn] });
    }
    if (pageNumberBtn) {
      pageNumberBtn.innerText = getSettings().currentPage;
    }
  } else if (getSettings().animateEnabled) {
    const { scrollTop } = document.scrollingElement || document.body;
    const currentMarker = getSettings().verticalPageMarkers.find((item): boolean => scrollTop <= item.top);
    if (currentMarker) {
      getSettings().currentPage = currentMarker.page;
      if (pageNumberBtn) {
        pageNumberBtn.innerText = getSettings().currentPage;
      }
    }
  } else {
    ev.preventDefault();
  }
};

window.addEventListener(
  'touchmove',
  (ev: TouchEvent): void => {
    if (!getSettings().animateEnabled || ev.targetTouches.length > 1) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  },
  { passive: false },
);

window.addEventListener(
  'touchstart',
  (ev: TouchEvent): void => {
    if (ev.targetTouches.length > 1) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  },
  { passive: false },
);

const onWindowLoad = (): void => {
  pageNumberBtn = document.getElementById('pageNumber');
  document.documentElement.style.setProperty(
    '--fontSize',
    `${getSettings().currentFontSize}px`,
  );
  const zoomPanel = document.body.querySelector(
    'body > .zoomPanel',
  ) as HTMLDivElement;
  const buttonsPanel = document.body.querySelector('body > .buttons');
  const fullScreenModeButton = document.body.querySelector(
    'body > .buttons > .fullScreenModeButton',
  );
  const increaseFontButton = document.body.querySelector(
    'body > .buttons > .increaseFontButton',
  );
  const decreaseFontButton = document.body.querySelector(
    'body > .buttons > .decreaseFontButton',
  );
  const increaseLineHeight = document.body.querySelector(
    'body > .buttons > .increaseLineHeight',
  );
  const decreaseLineHeight = document.body.querySelector(
    'body > .buttons > .decreaseLineHeight',
  );
  const nightModeButton = document.body.querySelector(
    'body > .buttons > .nightModeButton',
  );
  const sepiaModeButton = document.body.querySelector(
    'body > .buttons > .sepiaModeButton',
  );
  const verticalScrollButton = document.body.querySelector(
    'body > .buttons > .verticalScrollButton',
  );

  const updateFontInfo = (): void => {
    document.documentElement.style.setProperty(
      '--fontSize',
      `${getSettings().currentFontSize}px`,
    );
    document.documentElement.style.setProperty(
      '--lineHeight',
      `${getSettings().lineHeight}em`,
    );
    recalculateColumnConfig(true);
  };

  verticalScrollButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    updateSettings({ verticalScroll: !getSettings().verticalScroll });
    document.body.className = `viewer epub ${getSettings().currentFont}${
      getSettings().verticalScroll ? ' vertical' : ''
      }`;
    if (getSettings().verticalScroll) {
      document.documentElement.style.setProperty('--animationSpeed', `0s`);
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.overflowX = 'none';
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      setTimeout((): void => {
        const pageIndicator = document.body.querySelector(
          `body > .zoomPanel > .chapterWrapper [data-page="${getSettings().currentPage}"]`,
        );
        if (pageIndicator) {
          document.documentElement.scrollTo(
            0,
            pageIndicator.getBoundingClientRect().top,
          );
        }
        recalculateColumnConfig(true);
      }, 0);
    } else {
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      document.documentElement.style.setProperty('--animationSpeed', `0.5s`);
      document.documentElement.style.overflowY = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      recalculateColumnConfig(true);
      updateSettings({ readMode: true });
      if (zoomPanel && buttonsPanel) {
        document.documentElement.style.setProperty('--viewerSnapType', `none`);
        const scrollFix = (document.body.scrollLeft * -1) / 3;
        updateSettings({ scrollFix, animateEnabled: false });
        document.documentElement.style.setProperty(
          '--horizontalScrollFix',
          `${getSettings().scrollFix}px`,
        );
        updateSettings({handleZoomAnimation: true});
        zoomPanel.className = `zoomPanel${getSettings().readMode ? ' zoom' : ''}`;
        buttonsPanel.className = `buttons${getSettings().readMode ? ' zoom' : ''}`;
      }
    }
  });
  fullScreenModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  });
  nightModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (!getSettings().handleZoomAnimation) {
      let { invertViewerColor } = getSettings();
      invertViewerColor = !invertViewerColor;
      updateSettings({ invertViewerColor });
      document.documentElement.style.setProperty(
        '--invertViewerColor',
        `${invertViewerColor ? 1 : 0}`,
      );
    }
  });
  sepiaModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (!getSettings().handleZoomAnimation) {
      let { sepiaViewerColor } = getSettings();
      sepiaViewerColor = !sepiaViewerColor;
      updateSettings({ sepiaViewerColor });
      document.documentElement.style.setProperty(
        '--sepiaViewerColor',
        `${sepiaViewerColor ? 1 : 0}`,
      );
      document.documentElement.style.setProperty(
        '--contrastViewerColor',
        `${sepiaViewerColor ? 0.6 : 1}`,
      );
    }
  });
  increaseFontButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { currentFontSize } = getSettings();
    if (currentFontSize < 32) {
      currentFontSize += 2;
      updateSettings({ currentFontSize });
      updateFontInfo();
    }
  });
  decreaseFontButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { currentFontSize } = getSettings();
    if (currentFontSize > 8) {
      currentFontSize -= 2;
      updateSettings({ currentFontSize });
      updateFontInfo();
    }
  });
  increaseLineHeight?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { lineHeight } = getSettings();
    if (lineHeight < 2) {
      lineHeight += 0.1;
      updateSettings({ lineHeight });
      updateFontInfo();
    }
  });
  decreaseLineHeight?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { lineHeight } = getSettings();
    if (lineHeight > 1) {
      lineHeight -= 0.1;
      updateSettings({ lineHeight });
      updateFontInfo();
    }
  });
  document.body.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    if (getSettings().animateEnabled) {
      updateSettings({ readMode: !getSettings().readMode });
      if (zoomPanel && buttonsPanel) {
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
          updateSettings({handleZoomAnimation: true});
          zoomPanel.className = `zoomPanel${getSettings().readMode ? ' zoom' : ''}`;
        }
        buttonsPanel.className = `buttons${getSettings().readMode ? ' zoom' : ''}`;
      }
    }
  });

  document.body.addEventListener('scroll', onBodyScroll);
  document.addEventListener('scroll', onBodyScroll);

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
        updateSettings({ currentFont: button.value});
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
    zoomPanel.addEventListener(
      eventName,
      (): void => {
        if (getSettings().handleZoomAnimation) {
          updateSettings({handleZoomAnimation: false});
          const newScrollX = document.body.scrollLeft - getSettings().scrollFix;
          document.body.scrollTo(newScrollX, 0);
          updateSettings({scrollFix: 0});
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
            updateSettings({animateEnabled: true});
            document.body.scrollTo(newScrollX, 0);
          });
        }
      },
      false,
    );
  });
};

window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', (): void => {
  recalculateColumnConfig(true);
});
