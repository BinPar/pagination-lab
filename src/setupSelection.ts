import selectWordFromPoint from './selectWordFromPoint';
import drawCurrentSelection from './drawCurrentSelection';
import { updateSettings, getSettings } from './settings';
import findNearestSnap from './findNearestSnap';
import {
  fromMouseEvent,
  fromTouchEvent,
  SyntheticEvent,
} from './model/SyntheticEvent';

/**
 * Setups the text selection
 */
const setupSelection = (): void => {
  let selectionTimeOut: NodeJS.Timeout | null;
  const content = document.body.querySelector('body > .zoomPanel');
  const chapterWrapper = document.body.querySelector(
    'body > .zoomPanel .chapterWrapper',
  ) as HTMLDivElement;
  let currentSelection: Range | null = null;
  let isMouseMove = false;
  let isMouseDown = false;

  const clearSelectionTimeOut = (): void => {
    if (selectionTimeOut) {
      clearTimeout(selectionTimeOut);
    }
  };

  const startSelection = (event: SyntheticEvent): void => {
    currentSelection = selectWordFromPoint(event);
    updateSettings({ currentSelection });
    drawCurrentSelection(currentSelection);
    isMouseMove = true;
  };

  if (content && chapterWrapper) {
    if (getSettings().disableContextMenu) {
      document.addEventListener('contextmenu', (ev): void => {
        ev.preventDefault();
      });
    }

    const onSelectionStart = (syntheticEvent: SyntheticEvent): void => {
      isMouseMove = false;
      isMouseDown = true;
      document.documentElement.style.setProperty('--dragCursor', 'grabbing');
      selectionTimeOut = setTimeout((): void => {
        startSelection(syntheticEvent);
      }, getSettings().selectionTimeOut);
    };

    /**
     * Avoids an unusual bug in Safari that raises the mouseDown after touchstart
     * breaking the snap system
     */
    let avoidSnapChange = false;

    content.addEventListener('mousedown', (ev): void => {
      const event = ev as MouseEvent;
      const syntheticEvent = fromMouseEvent(event);
      if (event.button === 0) {
        ev.preventDefault();
        ev.stopPropagation();
        if (!avoidSnapChange) {
          document.documentElement.style.setProperty(
            '--viewerSnapType',
            `none`,
          );
        }
        onSelectionStart(syntheticEvent);
      } else if (event.button === 2 && getSettings().selectWithRightClick) {
        startSelection(syntheticEvent);
      }
    });

    content.addEventListener('touchstart', (ev): void => {
      avoidSnapChange = true;
      const event = ev as TouchEvent;
      const syntheticEvent = fromTouchEvent(event);
      if (event.touches.length === 1) {
        onSelectionStart(syntheticEvent);
      }
    });

    content.addEventListener('touchmove', clearSelectionTimeOut);

    content.addEventListener('touchend', (): void => {
      clearSelectionTimeOut();
      setTimeout((): void => {
        avoidSnapChange = false;
      }, 100);
    });

    window.addEventListener('mouseup', (ev: Event): void => {
      clearSelectionTimeOut();
      if (isMouseDown && isMouseMove && !getSettings().draggingSelection) {
        isMouseMove = false;
        if (getSettings().animateEnabled && !getSettings().verticalScroll) {
          updateSettings({
            animateEnabled: false,
          });
          // We need to animate to the next snap and then reactivate the snap
          const event = ev as MouseEvent;
          const initialSpeed = event.movementX;
          document.body.scrollBy(initialSpeed / window.devicePixelRatio, 0);
          const currentPosition = document.body.scrollLeft;
          const targetPosition = findNearestSnap(currentPosition);
          const delta = (targetPosition - currentPosition) / 10;
          let iteration = 0;
          const animate = (): void => {
            if (iteration < 10) {
              iteration++;
              document.body.scrollBy(delta, 0);
              window.requestAnimationFrame(animate);
            } else {
              document.documentElement.style.setProperty(
                '--viewerSnapType',
                `x mandatory`,
              );
              updateSettings({
                animateEnabled: true,
              });
            }
          };
          window.requestAnimationFrame(animate);
        } else {
          document.documentElement.style.setProperty(
            '--viewerSnapType',
            `x mandatory`,
          );
        }
        document.documentElement.style.setProperty('--dragCursor', 'grab');
      }
      isMouseDown = false;
    });

    window.addEventListener('mousemove', (ev: Event): void => {
      clearSelectionTimeOut();
      if (isMouseDown) {
        const event = ev as MouseEvent;
        isMouseMove = true;
        if (getSettings().verticalScroll) {
          const scrollingElement = document.scrollingElement || document.body;
          scrollingElement.scrollBy(
            0,
            -event.movementY / window.devicePixelRatio,
          );
        } else {
          document.body.scrollBy(-event.movementX / window.devicePixelRatio, 0);
        }
      } else if (getSettings().debugSelectOnHover) {
        const event = ev as MouseEvent;
        const syntheticEvent = fromMouseEvent(event);
        currentSelection = selectWordFromPoint(syntheticEvent);
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
  }
};

export default setupSelection;
