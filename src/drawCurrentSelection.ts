import { getSettings } from './settings';

let highLightsWrapper: HTMLDivElement;

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
    const readMode = getSettings().readMode || getSettings().verticalScroll;
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
      const scrollingElement = document.scrollingElement || document.body;
      const fixZoom = readMode ? 1 : (1 / 0.75)
      let topFix = getSettings().currentFontSize;
      let leftFix = 0;
      if (!readMode) {
        topFix = window.innerHeight / 2 * - 0.25 - getSettings().currentFontSize * 0.5;
        leftFix = window.innerWidth / 2 * -0.25;
      }
      highLight.style.left = `${(rect.left - 1 + document.body.scrollLeft + leftFix) * fixZoom}px`;
      highLight.style.top = `${(rect.top - 1 + scrollingElement.scrollTop + topFix) * fixZoom}px`;
      highLight.style.width = `${(rect.width + 2) * fixZoom}px`;
      highLight.style.height = `${(rect.height + 2) * fixZoom}px`;
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