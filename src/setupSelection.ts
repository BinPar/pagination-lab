import clearSelection from './clearSelection';
import selectWordFromPoint from './selectWordFromPoint';
import drawCurrentSelection from './drawCurrentSelection';
import { updateSettings, getSettings } from './settings';

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

    if (getSettings().disableContextMenu) {
      document.addEventListener('contextmenu', (ev): void => {
        ev.preventDefault()
      });
    }

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
        document.documentElement.style.setProperty('--dragCursor', 'grabbing');
      } else if (event.button === 2) {
        currentSelection = selectWordFromPoint(event);
        updateSettings({ currentSelection });
        drawCurrentSelection(currentSelection);
      }
    });

    window.addEventListener('mouseup', (): void => {
      if (isMouseDown) {
        isMouseDown = false;
        document.documentElement.style.setProperty(
          '--viewerSnapType',
          `x mandatory`,
        );
        document.documentElement.style.setProperty('--dragCursor', 'grab');
      }
    });

    window.addEventListener('mousemove', (ev: Event): void => {
      if (isMouseDown) {
        const event = ev as MouseEvent;
        isMouseMove = true;
        if (getSettings().verticalScroll) {
          const scrollingElement = document.scrollingElement || document.body;
          scrollingElement.scrollBy(0, -event.movementY / window.devicePixelRatio);
        } else {
          document.body.scrollBy(-event.movementX / window.devicePixelRatio, 0);
        }
      } else if (getSettings().debugSelectOnHover) {
        const event = ev as MouseEvent;
        currentSelection = selectWordFromPoint(event);
        updateSettings({ currentSelection });
        drawCurrentSelection(currentSelection);
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