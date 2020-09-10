
/**
 * Draws the current selection in the DOM
 * @param selection Selection to draw
 */
const drawCurrentSelection = (selection: Range | null, hightLightsWrapper: HTMLDivElement): void => {
  hightLightsWrapper
    .querySelectorAll('.hightLight')
    .forEach((label): void => {
      label.remove();
    });

  const rects = selection?.getClientRects();
  if (rects && rects.length) {
    for (let i = 0; i < rects?.length; i++) {
      const rect = rects[i];
      const hightLight = document.createElement('div');
      hightLight.className = 'hightLight';
      hightLight.style.left = `${rect.left - 1 + document.body.scrollLeft}px`;
      hightLight.style.top = `calc(${rect.top - 1}px + 1em)`;
      hightLight.style.width = `${rect.width + 2}px`;
      hightLight.style.height = `${rect.height + 2}px`;
      hightLightsWrapper.append(hightLight);
    }
  }
};

export default drawCurrentSelection;