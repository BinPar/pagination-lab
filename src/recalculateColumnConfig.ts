import PageNumberMark from './model/PageNumberMark';

const recalculateColumnConfig = (currentFontSize: number): void => {
  const labelsContainer = document.body.querySelector(
    'body > .labelsForEveryPage',
  );
  document.body
    .querySelectorAll('body > .labelsForEveryPage > .label')
    .forEach((label): void => {
      label.remove();
    });
  const windowWidth = window.innerWidth;
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--totalChapterWidth', '0');
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--windowWidth', `${0}px`);
  document.documentElement.style.setProperty('--totalColumnWidth', `0`);
  const columnWidth =
    (document.getElementById('totalColumnWidthCalculator')?.clientWidth || 1) + currentFontSize * 2;
  const columnsInPageWidth = Math.floor(windowWidth / columnWidth);
  const totalColumnWidth = windowWidth / columnsInPageWidth;
  document.documentElement.style.setProperty(
    '--totalColumnWidth',
    `${totalColumnWidth}px`,
  );
  const totalColumns = Math.round(
    window.document.body.scrollWidth / totalColumnWidth,
  );
  const totalChapterWidth = totalColumnWidth * totalColumns;
  document.documentElement.style.setProperty(
    '--totalChapterWidth',
    `${totalChapterWidth}px`,
  );

  const pagesDict: PageNumberMark[] = [];
  
  document.body
    .querySelectorAll('body > .chapterWrapper [data-page]')
    .forEach((item): void => {
      const element = item as HTMLElement;
      if (element.dataset.page) {
        pagesDict.push({
          left: element.getClientRects()[0].x,
          page: element.dataset.page,
        });
      }
    });

  let currentPage = pagesDict.length ? pagesDict[0].page : '';

  for (let column = 1; column <= totalColumns; column++) {
    const maxLeft = column * totalColumnWidth;
    if (pagesDict.length && pagesDict[0].left < maxLeft) {
      currentPage =pagesDict[0].page;
      while (pagesDict.length && pagesDict[0].left < maxLeft) {
        pagesDict.shift(); 
      }
    }
    const columnDiv = document.createElement('div');
    columnDiv.className = 'label';
    const label = document.createElement('p');
    label.innerText = `${currentPage}`;
    columnDiv.appendChild(label);
    labelsContainer?.appendChild(columnDiv);
  }
};

export default recalculateColumnConfig;