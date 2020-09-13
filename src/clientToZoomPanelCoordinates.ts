import { Coordinates } from './model/Coordinates';
import { getSettings } from './settings';

/**
 * Translates client coordinates to Zoom Panel coordinates
 * recalculating the zoom and scroll deformations 
 * @param client client coordinates
 * @returns {Coordinates} Zoom Panel coordinates
 */
const clientToZoomPanelCoordinates = (client: Coordinates): Coordinates => {
  const result = { ...client };
  const { readMode, currentFontSize, verticalScroll } = getSettings();
  const scrollingElement = document.scrollingElement || document.body;
  const fixZoom = (readMode || verticalScroll) ? 1 : (1 / 0.75)
  let topFix = currentFontSize;
  let leftFix = 0;
  if (!readMode && !verticalScroll) {
    topFix = window.innerHeight / 2 * - 0.25 - currentFontSize * 0.5;
    leftFix = window.innerWidth / 2 * - 0.25;
  }
  result.x = (client.x + document.body.scrollLeft + leftFix) * fixZoom;
  result.y = (client.y + scrollingElement.scrollTop + topFix) * fixZoom;
  result.fixZoom = fixZoom;
  return result;
}

export default clientToZoomPanelCoordinates;