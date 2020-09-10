import { getSettings } from './settings';

let hightLightsWrapper: HTMLDivElement;
/**
 * Draws the current selection in the DOM
 * @param selection Selection to draw
 */
const drawCurrentSelection = (selection: Range | null): void => {

  if (!hightLightsWrapper) {
    hightLightsWrapper = document.body.querySelector('body > .zoomPanel .hightLights') as HTMLDivElement;
  }

  if (!getSettings().animateEnabled) {
    // we need to aboid it during the zoom animation
    return;
  }

  if (!selection) {
    hightLightsWrapper
      .querySelectorAll('.hightLight')
      .forEach((label): void => {
        label.remove();
      });
  }

  const rects = selection?.getClientRects();

  if (rects && rects.length) {
    const readMode = getSettings().readMode || getSettings().verticalScroll;
    const reusable = new Array<HTMLDivElement>();
    hightLightsWrapper
      .querySelectorAll('.hightLight')
      .forEach((label, i): void => {
        if (i < rects?.length) {
          reusable.push(label as HTMLDivElement);
        } else {
          label.remove();
        }
      });

    for (let i = 0; i < rects?.length; i++) {
      const rect = rects[i];
      const hightLight = i < reusable.length ? reusable[i] : document.createElement('div');
      hightLight.className = 'hightLight';
      const scrollingElement = document.scrollingElement || document.body;
      const fixZoom = readMode ? 1 : (1 / 0.75)
      let topFix = getSettings().currentFontSize;
      let leftFix = 0;
      if (!readMode) {
        topFix = window.innerHeight / 2 * - 0.25 - getSettings().currentFontSize * 0.5;
        leftFix = window.innerWidth / 2 * -0.25;
      }
      hightLight.style.left = `${(rect.left - 2 + document.body.scrollLeft + leftFix) * fixZoom}px`;
      hightLight.style.top = `${(rect.top - 1 + scrollingElement.scrollTop + topFix) * fixZoom}px`;
      hightLight.style.width = `${(rect.width + 4) * fixZoom}px`;
      hightLight.style.height = `${(rect.height + 2) * fixZoom}px`;
      if (i >= reusable.length) {
        hightLightsWrapper.append(hightLight);
      }
    }
  }
};

export default drawCurrentSelection;