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
  const increaseFontButton = document.body.querySelector(
    'body > .buttons > .increaseFontButton',
  );
  const nightModeButton = document.body.querySelector(
    'body > .buttons > .nightModeButton',
  );
  const decreaseFontButton = document.body.querySelector(
    'body > .buttons > .decreaseFontButton',
  );
  const updateFontInfo = (): void => {
    document.documentElement.style.setProperty(
      '--fontSize',
      `${settings.currentFontSize}px`,
    );
    settings = recalculateColumnConfig(settings, true);
  };
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
