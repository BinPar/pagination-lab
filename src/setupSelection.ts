import { getSettings } from './settings';
import clearSelection from './clearSelection';
/**
 * Setups the text selection
 */
const setupSelection = (): void => {  
  const content = document.body.querySelector('body > .zoomPanel');
  let isMouseMove = false;
  let isMouseDown = false;
  if (content) {
    content.addEventListener('mousedown', (ev): void => {
      isMouseMove = false;
      isMouseDown = true;
      ev.preventDefault();
      ev.stopPropagation();
      document.documentElement.style.setProperty(
        '--viewerSnapType',
        `none`,
      );
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