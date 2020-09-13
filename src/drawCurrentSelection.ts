import clientToZoomPanelCoordinates from './clientToZoomPanelCoordinates';
import { getSettings } from './settings';

let highLightsWrapper: HTMLDivElement;

let draggingExtension: HTMLDivElement | null = null;

window.addEventListener('mousemove', (ev: Event): void => {
  if (draggingExtension) {
    ev.preventDefault();
    ev.stopPropagation();
    const event = ev as MouseEvent;
    const zoomPanelCoordinates = clientToZoomPanelCoordinates({ x: event.clientX, y: event.clientY });
    draggingExtension.style.left = `${zoomPanelCoordinates.x}px`;
    draggingExtension.style.top = `${zoomPanelCoordinates.y}px`;
  }
});

window.addEventListener('mouseup', (ev: Event): void => {
  if (draggingExtension) {
    ev.preventDefault();
    ev.stopPropagation();
    draggingExtension = null;
    document.documentElement.style.setProperty('--dragCursor', 'grab');
  }
});

/**
 * Adds one of the extensors (left of right)
 * that allows the user to expend the text selection
 * @param textSelection text selection to be extended
 * @param left is it the left extensor or the one on the right
 * @returns {HTMLDivElement} div element of the text selector
 */
const addExtensorsToHighLight = (textSelection: HTMLDivElement, left: boolean): HTMLDivElement => {
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
  extension.addEventListener('mousedown', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    draggingExtension = extension;
    document.documentElement.style.setProperty('--dragCursor', left ? 'w-resize' : 'e-resize');
  });
  extension.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
  });
  return extension;
}
/**
 * Draws the current selection in the DOM
 * @param selection Selection to draw
 */
const drawCurrentSelection = (selection: Range | null): void => {

  if (!highLightsWrapper) {
    highLightsWrapper = document.body.querySelector('body > .zoomPanel .highLights') as HTMLDivElement;
  }

  if (!getSettings().animateEnabled) {
    // we need to avoid it during the zoom animation
    return;
  }

  if (!selection) {
    highLightsWrapper
      .querySelectorAll('.highLight')
      .forEach((label): void => {
        label.remove();
      });
  }

  const rects = selection?.getClientRects();

  if (rects && rects.length) {
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
      const highLight = i < reusable.length ? reusable[i] : document.createElement('div');
      highLight.className = 'highLight';
      const zoomPanelCoordinates = clientToZoomPanelCoordinates({ x: rect.left, y: rect.top });
      const fixZoom = zoomPanelCoordinates.fixZoom || 1;
      highLight.style.left = `${zoomPanelCoordinates.x - 1}px`;
      highLight.style.top = `${zoomPanelCoordinates.y - 1}px`;
      highLight.style.width = `${rect.width * fixZoom + 2}px`;
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

export default drawCurrentSelection;