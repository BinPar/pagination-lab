import PageNumberMark from './model/PageNumberMark';
import { getSettings, updateSettings } from './settings';
import drawCurrentSelection from './drawCurrentSelection';

/**
 * Removes all labels and page snaps
 */
const clearPaginationContents = (): void => {
  document.body
    .querySelectorAll('body > .zoomPanel >.labelsForEveryPage > .label')
    .forEach((label): void => {
      label.remove();
    });

  document.body
    .querySelectorAll('body > .pageSnaps > .scrollSnap')
    .forEach((label): void => {
      label.remove();
    });
}

/**
 * Recalculates all the pagination information
 * @param updateScroll Updates the scroll position to maintain the current reading point
 */
const recalculateColumnConfig = (
  updateScroll = false,
): void => {
  const newSettings = { ...getSettings() };

  const labelsContainer = document.body.querySelector(
    'body > .zoomPanel > .labelsForEveryPage',
  );
  const pageSnapsContainer = document.body.querySelector('body > .pageSnaps');
  clearPaginationContents();

  const windowWidth = window.innerWidth;
  const vh = window.innerHeight;
  
  /**
   * Set the general style properties
   */
  document.documentElement.style.setProperty('--totalChapterWidth', '0');
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--windowWidth', `${0}px`);
  document.documentElement.style.setProperty('--totalColumnWidth', `0`);
  const totalColumnWidthCalculator =
    document.getElementById('totalColumnWidthCalculator')?.clientWidth || 1;
  const columnWidth = totalColumnWidthCalculator + 36;
  const columnsInPageWidth = Math.floor(windowWidth / columnWidth);
  const totalColumnWidth = windowWidth / columnsInPageWidth;

  let bodyScrollWidth = document.body.scrollWidth;
  if (!getSettings().readMode) {
    bodyScrollWidth -= (window.innerWidth / 2) * 0.25;
  }

  const bodyWidth = bodyScrollWidth * (getSettings().readMode ? 1 : 1 / 0.75);

  const totalColumns = Math.round(bodyWidth / totalColumnWidth);

  document.documentElement.style.setProperty(
    '--totalColumnWidth',
    `${totalColumnWidth}px`,
  );

  const totalChapterWidth = totalColumnWidth * totalColumns;

  const scrollingElement = document.body;

  document.documentElement.style.setProperty(
    '--totalChapterWidth',
    `${totalChapterWidth}px`,
  );

  const pagesDict: PageNumberMark[] = [];
  const pagesPerColumn: string[] = [];
  const verticalPageMarkers: { top: number; page: string }[] = [];

  let setScrollTo = 0;
  if (getSettings().verticalScroll) {
    /**
     * Vertical scroll: really easy setup
     */
    const { scrollTop } = document.scrollingElement || document.body;
    document.body
      .querySelectorAll('body > .zoomPanel > .chapterWrapper [data-page]')
      .forEach((item): void => {
        const element = item as HTMLElement;
        const rects = element.getClientRects();
        let top = rects[0].y;
        top += scrollTop;
        verticalPageMarkers.push({
          top,
          page: element.dataset.page as string,
        })
      });
  } else {
    /**
     * Horizontal scroll: pagination mode (the complex way)
     */
    const { scrollLeft } = document.body;

    // We precalculate a dictionary for the pages based on the
    // left position of each column
    document.body
      .querySelectorAll('body > .zoomPanel > .chapterWrapper [data-page]')
      .forEach((item): void => {
        const element = item as HTMLElement;
        const rects = element.getClientRects();
        let left = rects[0].x;
        if (!getSettings().readMode) {
          left -= (window.innerWidth / 2) * 0.25;
          left += scrollLeft;
          left /= 0.75;
        } else {
          left += scrollLeft;
        }
        if (element.dataset.page) {
          pagesDict.push({
            left,
            page: element.dataset.page,
          });
        }
      });
      
    // Set the current page to the first or the one in the settings
    let currentPage = pagesDict.length ? pagesDict[0].page : '';
    let nextPage = '';
    if (newSettings.currentPage === '') {
      newSettings.currentPage = currentPage;
    }

    let pageSet = false;
    setScrollTo = scrollingElement.scrollLeft;

    // Loops the columns generating all the additional elements required:
    // labels, scrollSnaps, etc.    
    for (let column = 1; column <= totalColumns; column++) {
      let relativeColumnWidth = totalColumnWidth;
      if (!getSettings().readMode) {
        relativeColumnWidth *= 0.75;
      }
      const maxLeft = column * totalColumnWidth;

      // Sets "setScrollTo" to the position of the currentPage
      // the logic here is more complex than you will expect
      if (column === 1 || column > totalColumns - 1) {
        currentPage = '';
      } else if (pagesDict.length && pagesDict[0].left < maxLeft) {
        currentPage = pagesDict[0].page;
        nextPage = currentPage;
        while (pagesDict.length && pagesDict[0].left < maxLeft) {
          if (!pageSet && newSettings.currentPage === pagesDict[0].page) {
            if (currentPage === newSettings.currentPage) {
              pageSet = true;
            }
            setScrollTo = column * relativeColumnWidth - relativeColumnWidth;
          }
          const removed = pagesDict.shift();
          if (removed) {
            nextPage = removed.page;
          }
        }
      }
      if (currentPage === '-') {
        currentPage = '';
      }      
      pagesPerColumn.push(currentPage);
      // Additional DOM elements creation
      const columnDiv = document.createElement('div');
      columnDiv.className = 'label';
      const label = document.createElement('p');
      label.innerText = `${currentPage}`;
      columnDiv.appendChild(label);
      labelsContainer?.appendChild(columnDiv);
      const isScrollSnap = (column - 2) % columnsInPageWidth === 0;
      if (isScrollSnap && currentPage) {
        const scrollSnapDiv = document.createElement('div');
        scrollSnapDiv.className = 'scrollSnap';
        if (newSettings.readMode) {
          scrollSnapDiv.style.left = `${(column - 1) * totalColumnWidth}px`;
        } else {
          scrollSnapDiv.style.left = `${
            (column - 1) * (totalColumnWidth * 0.75)
            }px`;
        }
        pageSnapsContainer?.appendChild(scrollSnapDiv);
      }
      currentPage = nextPage;
    }
  }

  // Update the scroll position
  if (updateScroll) {
    document.body.scrollTo(setScrollTo, 0);
  }

  // Update the settings
  newSettings.columnWidth = totalColumnWidth;
  newSettings.totalColumns = totalColumns;
  newSettings.pagesPerColumn = pagesPerColumn;
  newSettings.verticalPageMarkers = verticalPageMarkers;
  updateSettings(newSettings);
  drawCurrentSelection(newSettings.currentSelection);
};

export default recalculateColumnConfig;
