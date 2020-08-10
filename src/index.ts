import * as log from 'loglevel';

const currentFontSize = 18;

const recalculateColumnConfig = (): void => {
  const labelsContainer = document.body.querySelector('body > .labelsForEveryPage');
  document.body.querySelectorAll('body > .labelsForEveryPage > .label').forEach((label): void => {
    label.remove();
  });
  const windowWidth = window.innerWidth;
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--totalChapterWidth', '0');
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--windowWidth', `${0}px`);
  document.documentElement.style.setProperty(
    '--totalColumnWidth',
    `0`,
  );
  const columnWidth =
    document.getElementById('totalColumnWidthCalculator')?.clientWidth || 1;
  const columnsInPageWidth = Math.floor(windowWidth / columnWidth);
  const totalColumnWidth = windowWidth / columnsInPageWidth;
  document.documentElement.style.setProperty(
    '--totalColumnWidth',
    `${totalColumnWidth}px`,
  );
  const totalColumns = Math.round(window.document.body.scrollWidth / totalColumnWidth);
  const totalChapterWidth = totalColumnWidth  * totalColumns;
  document.documentElement.style.setProperty('--totalChapterWidth', `${totalChapterWidth}px`);
  for (let column = 1; column <= totalColumns; column++) {
    const columnDiv = document.createElement('div');
    columnDiv.className = 'label';
    const label = document.createElement('p');
    label.innerText = `${column}`;
    columnDiv.appendChild(label);
    labelsContainer?.appendChild(columnDiv);
  }
}

const onWindowLoad = (): void => {  
  document.documentElement.style.setProperty(
    '--fontSize',
    `${currentFontSize}px`,
  );
  recalculateColumnConfig();
  setTimeout(recalculateColumnConfig, 1000);
};

window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', recalculateColumnConfig);
