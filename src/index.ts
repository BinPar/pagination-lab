import recalculateColumnConfig from './recalculateColumnConfig';
import Settings from './model/Settings';

interface FontFaceSet {
  readonly ready: Promise<FontFaceSet>;
}

declare global {
  interface Document {
    fonts: FontFaceSet;
  }
}

let settings: Settings = {
  currentFontSize: 18,
  columnWidth: 0,
  totalColumns: 0,
  scrollFix: 0,
  currentPage: '',
  pagesPerColumn: [],
  readMode: true,
  animateEnabled: true,
  invertViewerColor: false,
  sepiaViewerColor: false,
  lineHeight: 1.5,
};

let handleZoomAnimation = false;

const recalculate = (): void => {
  settings = recalculateColumnConfig(settings, false);
};

const recalculateAndScroll = (): void => {
  settings = recalculateColumnConfig(settings, true);
};

let pageNumberBtn: HTMLElement | null;

const onBodyScroll = (ev: Event): void => {
  if (settings.animateEnabled) {
    let { columnWidth } = settings;
    if (!settings.readMode) {
      columnWidth *= 0.75;
    }
    const currentColumn = Math.round(
      (document.body.scrollLeft - settings.scrollFix) / columnWidth,
    );
    if (currentColumn < settings.pagesPerColumn.length) {
      settings.currentPage = settings.pagesPerColumn[currentColumn];
    }
    if (pageNumberBtn) {
      pageNumberBtn.innerText = settings.currentPage;
    }
  } else {
    ev.preventDefault();
  }
};

window.addEventListener(
  'touchmove',
  (ev: TouchEvent): void => {
    if (!settings.animateEnabled || ev.targetTouches.length > 1) {
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
    `${settings.currentFontSize}px`,
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
  
  const updateFontInfo = (): void => {
    document.documentElement.style.setProperty(
      '--fontSize',
      `${settings.currentFontSize}px`,
    );
    document.documentElement.style.setProperty(
      '--lineHeight',
      `${settings.lineHeight}em`,
    );
    settings = recalculateColumnConfig(settings, true);
  };
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
    if (!handleZoomAnimation) {
      settings.invertViewerColor = !settings.invertViewerColor;
      document.documentElement.style.setProperty(
        '--invertViewerColor',
        `${settings.invertViewerColor ? 1 : 0}`,
      );    
    }
  });
  sepiaModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (!handleZoomAnimation) {
      settings.sepiaViewerColor = !settings.sepiaViewerColor;
      document.documentElement.style.setProperty(
        '--sepiaViewerColor',
        `${settings.sepiaViewerColor ? 1 : 0}`,
      );    
      document.documentElement.style.setProperty(
        '--contrastViewerColor',
        `${settings.sepiaViewerColor ? 0.6 : 1}`,
      );    
    }
  });
  increaseFontButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (settings.currentFontSize < 50) {
      settings.currentFontSize += 2;
      updateFontInfo();
    }
  });
  decreaseFontButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (settings.currentFontSize > 8) {
      settings.currentFontSize -= 2;
      updateFontInfo();
    }
  });
  increaseLineHeight?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (settings.lineHeight < 2) {
      settings.lineHeight += 0.1;
      updateFontInfo();
    }
  });
  decreaseLineHeight?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (settings.lineHeight > 1) {
      settings.lineHeight -= 0.1;
      updateFontInfo();
    }
  });
  
  document.body.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    if (settings.animateEnabled) {
      settings.readMode = !settings.readMode;
      if (zoomPanel && buttonsPanel) {
        settings.animateEnabled = false;
        document.documentElement.style.setProperty('--viewerSnapType', `none`);
        if (settings.readMode) {
          const scrollFix = (document.body.scrollLeft * -1) / 3;
          settings.scrollFix = scrollFix;
          document.documentElement.style.setProperty(
            '--horizontalScrollFix',
            `${settings.scrollFix}px`,
          );
        } else {
          const scrollFix = document.body.scrollLeft * 0.25;
          settings.scrollFix = scrollFix;
          document.documentElement.style.setProperty(
            '--horizontalScrollFix',
            `${settings.scrollFix}px`,
          );
        }
        handleZoomAnimation = true;
        zoomPanel.className = `zoomPanel${settings.readMode ? ' zoom' : ''}`;
        buttonsPanel.className = `buttons${settings.readMode ? ' zoom' : ''}`;
      }
    }
  });
  document.body.addEventListener('scroll', onBodyScroll);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then((): void => {
      recalculateAndScroll();
    });
  }

  document.body
    .querySelectorAll<HTMLButtonElement>('body > .buttons > .selectTypography')
    .forEach((button): void => {
      button?.addEventListener('click', (ev: Event): void => {
        ev.preventDefault();
        ev.stopPropagation();
        document.body.className = `viewer epub ${button.value}`;
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
        if (handleZoomAnimation) {
          handleZoomAnimation = false;
          const newScrollX = document.body.scrollLeft - settings.scrollFix;
          document.body.scrollTo(newScrollX, 0);
          settings.scrollFix = 0;
          document.documentElement.style.setProperty('--animationSpeed', `0s`);
          document.documentElement.style.setProperty(
            '--horizontalScrollFix',
            `${settings.scrollFix}px`,
          );

          recalculate();
          setTimeout((): void => {
            document.documentElement.style.setProperty(
              '--animationSpeed',
              `0.5s`,
            );
            settings.animateEnabled = true;
            document.documentElement.style.setProperty(
              '--viewerSnapType',
              `x mandatory`,
            );
            document.body.scrollTo(newScrollX, 0);
          }, 0);
        }
      },
      false,
    );
  });
};

window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', recalculateAndScroll);
