import recalculateColumnConfig from './recalculateColumnConfig';
import Settings from './model/Settings';

let settings: Settings = {
  currentFontSize: 18,
  columnWidth: 0,
  totalColumns: 0,
  currentPage: '',
  pagesPerColumn: [],
  readMode: true,
  animateEnabled: true,
};

const recalculate = (): void => {
  settings = recalculateColumnConfig(settings);
};

const onBodyScroll = (): void => {
  const currentColumn = Math.round(
    document.body.scrollLeft / settings.columnWidth,
  );
  if (currentColumn < settings.pagesPerColumn.length) {
    settings.currentPage = settings.pagesPerColumn[currentColumn];
  }
};

const onWindowLoad = (): void => {
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
    recalculate();
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
        document.documentElement.style.setProperty(
          '--transitionDuration',
          '0.5s',
        );
        let scrollFix = document.body.scrollLeft * 0.25;
        if (settings.readMode) {
          scrollFix = document.body.scrollLeft  * -(1/3);
        }
        
        document.documentElement.style.setProperty(
          '--horizontalScrollFix',
          `${scrollFix}px`,
        );
        
        setTimeout((): void => {
          document.documentElement.style.setProperty(
            '--transitionDuration',
            '0s',
          );
          document.documentElement.style.setProperty(
            '--horizontalScrollFix',
            '0',
          );
          document.body.scrollBy(-1 * scrollFix, 0);
          setTimeout((): void => {
            document.documentElement.style.setProperty(
              '--transitionDuration',
              '0.5s',
            );
            settings.animateEnabled = true;
          }, 0);            
        }, 500);
        zoomPanel.className = `zoomPanel${settings.readMode ? ' zoom' : ''}`;
        buttonsPanel.className = `buttons${settings.readMode ? ' zoom' : ''}`;
      }
    }
  });
  recalculate();
  setTimeout(recalculate, 1000);
  document.body.addEventListener('scroll', onBodyScroll);

  document.body
    .querySelectorAll<HTMLButtonElement>('body > .buttons > .selectTypography')
    .forEach((button): void => {
      button?.addEventListener('click', (ev: Event): void => {
        ev.preventDefault();
        ev.stopPropagation();
        document.body.className = `viewer epub ${button.value}`;
        recalculate();
        setTimeout(recalculate, 1000);
      });
    });
};

window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', recalculate);
