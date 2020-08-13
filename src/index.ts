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
};

const recalculate = (): void => {
  settings = recalculateColumnConfig(settings, false);
};

let lastScroll = 0;
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

        if (settings.readMode) {
          const scrollFix = document.body.scrollLeft * - 1/3;
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
        zoomPanel.className = `zoomPanel${settings.readMode ? ' zoom' : ''}`;
      }
    }
    lastScroll = document.body.scrollLeft;
  });
  document.body.addEventListener('scroll', onBodyScroll);  

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then((): void => {
      recalculate();
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
        document.body.scrollTo(document.body.scrollLeft - settings.scrollFix ,0);
        settings.scrollFix = 0;
        document.documentElement.style.setProperty(
          '--animationSpeed',
          `0s`,
        );
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
        });
      },
      false,
    );
  });
};

window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', recalculate);
