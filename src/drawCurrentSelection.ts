import clientToZoomPanelCoordinates from './clientToZoomPanelCoordinates';
import deduplicateRectangles from './deduplicateRectangles';
import { fromMouseEvent } from './model/SyntheticEvent';
import selectWordFromPoint from './selectWordFromPoint';
import { getSettings, updateSettings } from './settings';

let highLightsWrapper: HTMLDivElement;
let draggingExtension: HTMLDivElement | null = null;
let isDraggingLeft = false;

// Start of dragging selection start or end
const onMouseDown = (
  ev: Event,
  extension: HTMLDivElement,
  left: boolean,
): void => {
  ev.preventDefault();
  ev.stopPropagation();
  draggingExtension = extension;
  isDraggingLeft = left;
  updateSettings({ draggingSelection: true });
  document.documentElement.style.setProperty(
    '--dragCursor',
    left ? 'w-resize' : 'e-resize',
  );
};

// Click on start or end selection
const onClick = (ev: Event): void => {
  ev.preventDefault();
  ev.stopPropagation();
};

/**
 * Adds one of the extensors (left of right)
 * that allows the user to expend the text selection
 * @param textSelection text selection to be extended
 * @param left is it the left extensor or the one on the right
 * @returns {HTMLDivElement} div element of the text selector
 */
const addExtensorsToHighLight = (
  textSelection: HTMLDivElement,
  left: boolean,
): HTMLDivElement => {
  const extension = document.createElement('div');
  extension.className = `highLight ${left ? 'left' : 'right'}Extensor`;
  extension.style.top = textSelection.style.top;
  const fontSize = getSettings().currentFontSize;
  const leftPos = Number.parseFloat(textSelection.style.left);
  const height = Number.parseFloat(textSelection.style.height);
  const width = Number.parseFloat(textSelection.style.width);
  const top = Number.parseFloat(textSelection.style.top);
  extension.style.top = `${top + height}px`;
  if (left) {
    extension.style.left = `${leftPos - fontSize}px`;
  } else {
    extension.style.left = `${leftPos + width}px`;
  }
  extension.style.width = `${fontSize}px`;
  extension.style.height = `${fontSize}px`;
  extension.addEventListener('mousedown', (ev: Event): void =>
    onMouseDown(ev, extension, left),
  );
  extension.addEventListener('touchStart', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();        
    onMouseDown(ev, extension, left);
  });
  extension.addEventListener('click', onClick);
  return extension;
};
/**
 * Draws the current selection in the DOM
 * @param selection Selection to draw
 */
const drawCurrentSelection = (selection: Range | null): void => {
  if (!highLightsWrapper) {
    highLightsWrapper = document.body.querySelector(
      'body > .zoomPanel .highLights',
    ) as HTMLDivElement;
  }

  if (!getSettings().animateEnabled) {
    // we need to avoid it during the zoom animation
    return;
  }

  if (!selection) {
    highLightsWrapper.querySelectorAll('.highLight').forEach((label): void => {
      label.remove();
    });
  }

  const rects = deduplicateRectangles(selection?.getClientRects());
  if (rects.length) {
    const reusable = new Array<HTMLDivElement>();
    highLightsWrapper
      .querySelectorAll('.highLight')
      .forEach((label, i): void => {
        if (i < rects?.length) {
          reusable.push(label as HTMLDivElement);
        } else {
          label.remove();
        }
      });

    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      const highLight =
        i < reusable.length ? reusable[i] : document.createElement('div');
      highLight.className = 'highLight';
      const zoomPanelCoordinates = clientToZoomPanelCoordinates({
        x: rect.left,
        y: rect.top,
      });
      const fixZoom = zoomPanelCoordinates.fixZoom || 1;
      highLight.style.left = `${zoomPanelCoordinates.x - 1}px`;
      highLight.style.top = `${zoomPanelCoordinates.y - 1}px`;
      highLight.style.width = `${rect.width * fixZoom + 1}px`;
      highLight.style.height = `${rect.height * fixZoom + 2}px`;
      if (i >= reusable.length) {
        highLightsWrapper.append(highLight);
      }
      // Add initial extensor
      if (i === 0) {
        highLightsWrapper.append(addExtensorsToHighLight(highLight, true));
      }
      // Add final extensor
      if (i === rects.length - 1) {
        highLightsWrapper.append(addExtensorsToHighLight(highLight, false));
      }
    }
  }
};

// Dragging selection start or end
window.addEventListener('mousemove', (ev: Event): void => {
  if (draggingExtension) {
    ev.preventDefault();
    ev.stopPropagation();
    const event = ev as MouseEvent;
    const syntheticEvent = fromMouseEvent(event);
    const selection = selectWordFromPoint(syntheticEvent, false);
    const { currentSelection } = getSettings();
    if (currentSelection && selection) {
      const newRange = currentSelection.cloneRange();
      if (isDraggingLeft) {
        newRange.setStart(selection?.startContainer, selection?.startOffset);
      } else {
        newRange.setEnd(selection?.endContainer, selection?.endOffset);
      }
      if (!newRange.collapsed) {
        updateSettings({ currentSelection: newRange });
        drawCurrentSelection(newRange);
      }
    }
  }
});

// End of dragging selection start or end
window.addEventListener('mouseup', (ev: Event): void => {
  if (draggingExtension) {
    ev.preventDefault();
    ev.stopPropagation();
    draggingExtension = null;
    setTimeout((): void => {
      updateSettings({ draggingSelection: false });
    }, 0);
    document.documentElement.style.setProperty('--dragCursor', 'grab');
  }
});

export default drawCurrentSelection;
