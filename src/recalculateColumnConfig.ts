import PageNumberMark from './model/PageNumberMark';
import Settings from './model/Settings';

const recalculateColumnConfig = (
  settings: Settings,
  updateScroll = false,
): Settings => {
  const newSettings = { ...settings };
  const labelsContainer = document.body.querySelector(
    'body > .zoomPanel > .labelsForEveryPage',
  );
  const pageSnapsContainer = document.body.querySelector('body > .pageSnaps');
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

  const windowWidth = window.innerWidth;
  const vh = window.innerHeight;
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
  if (!settings.readMode) {
    bodyScrollWidth -= (window.innerWidth / 2) * 0.25;
  }

  const bodyWidth = bodyScrollWidth * (settings.readMode ? 1 : 1 / 0.75);

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
  if (settings.verticalScroll) {
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
    const { scrollLeft } = document.body;
    document.body
      .querySelectorAll('body > .zoomPanel > .chapterWrapper [data-page]')
      .forEach((item): void => {
        const element = item as HTMLElement;
        const rects = element.getClientRects();
        let left = rects[0].x;
        if (!settings.readMode) {
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

    let currentPage = pagesDict.length ? pagesDict[0].page : '';
    let nextPage = '';
    if (newSettings.currentPage === '') {
      newSettings.currentPage = currentPage;
    }

    let pageSet = false;
    setScrollTo = scrollingElement.scrollLeft;
    for (let column = 1; column <= totalColumns; column++) {
      let relativeColumnWidth = totalColumnWidth;
      if (!settings.readMode) {
        relativeColumnWidth *= 0.75;
      }
      const maxLeft = column * totalColumnWidth;
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
  if (updateScroll) {
    document.body.scrollTo(setScrollTo, 0);
  }
  newSettings.columnWidth = totalColumnWidth;
  newSettings.totalColumns = totalColumns;
  newSettings.pagesPerColumn = pagesPerColumn;
  newSettings.verticalPageMarkers = verticalPageMarkers;

  return newSettings;
};

export default recalculateColumnConfig;
