import { getSettings } from './settings';
import clearSelection from './clearSelection';
import selectWordFromPoint from './selectWordFromPoint';
import drawCurrentSeletion from './drawCurrentSeletion';

/**
 * Setups the text selection
 */
const setupSelection = (): void => {
  const content = document.body.querySelector('body > .zoomPanel');
  const chapterWrapper = document.body.querySelector('body > .zoomPanel .chapterWrapper') as HTMLDivElement;
  let currentSelection: Range | null = null;
  let isMouseMove = false;
  let isMouseDown = false;
  if (content && chapterWrapper) {

    document.addEventListener('contextmenu', (ev): void => {
      ev.preventDefault()
    });

    content.addEventListener('mousedown', (ev): void => {
      const event = ev as MouseEvent;
      if (event.button === 0) {
        isMouseMove = false;
        isMouseDown = true;
        ev.preventDefault();
        ev.stopPropagation();
        document.documentElement.style.setProperty(
          '--viewerSnapType',
          `none`,
        );
      } else if (event.button === 2) {
        currentSelection = selectWordFromPoint(event);     
        drawCurrentSeletion(currentSelection);
      }
    });

    window.addEventListener('mouseup', (): void => {
      if (isMouseDown) {
        isMouseDown = false;
        document.documentElement.style.setProperty(
          '--viewerSnapType',
          `x mandatory`,
        );
      }
    });

    window.addEventListener('mousemove', (ev: Event): void => {
      if (isMouseDown) {
        const event = ev as MouseEvent;
        isMouseMove = true;
        if (getSettings().verticalScroll) {
          const scrollingElement = document.scrollingElement || document.body;
          scrollingElement.scrollBy(0, -event.movementY);
        } else {
          document.body.scrollBy(-event.movementX, 0);
        }
      }
    });

    content.addEventListener('click', (ev: Event): void => {
      if (isMouseMove) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    });

    document.addEventListener('selectionchange', (ev): void => {
      ev.preventDefault();
      ev.stopPropagation();
      const selection = window.getSelection();
      if (selection && selection.type === 'Range') {
        clearSelection();
      }

    });
  }

}

export default setupSelection;