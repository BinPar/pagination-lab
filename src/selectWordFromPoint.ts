import getRangeFromPoint from "./getRangeFromPoint";
import { SyntheticEvent } from "./model/SyntheticEvent";
import { getSettings } from './settings';

let chapterWrapper: HTMLDivElement;

/**
 * Returns the selections of a full word under the cursor (iOS and Android style)
 * @param ev Mouse Event
 * @returns Range of the selection
 */
const selectWordFromPoint = (ev: SyntheticEvent, word = true): Range | null => {
  let result: Range | null = null;
  if (!chapterWrapper) {
    chapterWrapper = document.body.querySelector('body > .zoomPanel .chapterWrapper') as HTMLDivElement;
  }
  if (chapterWrapper) {
    if (!getSettings().animateEnabled) {
      // we need to avoid it during the zoom animation
      return null;
    }
    chapterWrapper.style.userSelect = 'auto';
    chapterWrapper.style.webkitUserSelect = 'auto';
    const range = getRangeFromPoint(ev);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);

      const tagName = selection.anchorNode?.nodeName;
      // We try to avoid the SGV nodes that generate
      // unexpected highlight rectangles
      if (tagName === 'polyline' ||
        tagName === 'path' ||
        tagName === 'circle' ||
        tagName === 'elipse') {
        result = null;
      } else {
        // We need to avoid the selection of any content that is not
        // contained in the chapterWrapper node
        let parent = selection.anchorNode?.parentElement;
        while (parent && parent.className !== 'chapterWrapper') {
          parent = parent?.parentElement;
        }
        if (parent && parent.className === 'chapterWrapper') {
          if (word) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (selection as any).modify('move', 'backward', 'word');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (selection as any).modify('extend', 'forward', 'word');
            result = selection.getRangeAt(0);
            // Avoid tailing space selection
            if (selection.toString().endsWith(' ')) {
              if (result.endOffset < 2) {
                // Special case of empty tag selection
                result.setEndBefore(result.endContainer)
              } else {
                result.setEnd(result.endContainer, result.endOffset - 1);
              }
            }
          } else {
            result = selection.getRangeAt(0);
          }
          // Avoid the selection of elements that are not behind the cursor
          const rect = result.getBoundingClientRect();
          const selectionMargin = getSettings().currentFontSize / 2;
          const cursorInsideSelection =
            rect.left - selectionMargin <= ev.clientX &&
            rect.right + selectionMargin >= ev.clientX &&
            rect.top - selectionMargin <= ev.clientY &&
            rect.bottom + selectionMargin >= ev.clientY;
          if (!cursorInsideSelection) {
            result = null;
          }
        } else {
          result = null;
        }
      }
      selection.removeAllRanges();
    }
    chapterWrapper.style.userSelect = 'none';
    chapterWrapper.style.webkitUserSelect = 'none';
  }
  return result;
}

export default selectWordFromPoint;