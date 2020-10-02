import { getSettings, updateSettings } from './settings';
import getDomUI from './getDomUI';
import { PageChangeEvent } from './model/Events';
import notifyEventToReact from './notifyEventToReact';

 const setupGeneralEvents = (): void => {
  const domUI = getDomUI();
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
      
      if (domUI.pageNumberBtn) {
        domUI.pageNumberBtn.innerText = getSettings().currentPage;
      } else {
        const pageChangeEvent: PageChangeEvent = {
          type: 'onPageChange',
          pageNumber: getSettings().currentPage,
        };
        notifyEventToReact(pageChangeEvent);
      }
    } else if (getSettings().animateEnabled) {
      const { scrollTop } = document.scrollingElement || document.body;
      const currentMarker = getSettings().verticalPageMarkers.find((item): boolean => scrollTop <= item.top);
      if (currentMarker) {
        getSettings().currentPage = currentMarker.page;
        if (domUI.pageNumberBtn) {
          domUI.pageNumberBtn.innerText = getSettings().currentPage;
        } else {
          const pageChangeEvent: PageChangeEvent = {
            type: 'onPageChange',
            pageNumber: getSettings().currentPage,
          };
          notifyEventToReact(pageChangeEvent);
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

  document.body.addEventListener('scroll', onBodyScroll);
  document.addEventListener('scroll', onBodyScroll);
}

export default setupGeneralEvents;