import getRangeFromPoint from "./getRangeFromPoint";
import { getSettings } from './settings';

let chapterWrapper: HTMLDivElement;

/**
 * Returns the selections of a full word under the cursor (iOS and Android style)
 * @param ev Mouse Event
 * @returns Range of the selection
 */
const selectWordFromPoint = (ev: MouseEvent): Range | null => {
  let result: Range | null = null;
  if (!chapterWrapper) {
    chapterWrapper = document.body.querySelector('body > .zoomPanel .chapterWrapper') as HTMLDivElement;
  }
  if (chapterWrapper) {
    if (!getSettings().animateEnabled) {
      // we need to aboid it during the zoom animation
      return null;
    }
    chapterWrapper.style.userSelect = 'auto';
    const range = getRangeFromPoint(ev);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);

      const tagName = selection.anchorNode?.nodeName;
      if (tagName === 'polyline' ||
        tagName === 'path' ||
        tagName === 'circle' ||
        tagName === 'elipse') {
        result = null;
      } else {
        let parent = selection.anchorNode?.parentElement;
        while (parent && parent.className !== 'chapterWrapper') {
          parent = parent?.parentElement;
        }
        if (parent && parent.className === 'chapterWrapper') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (selection as any).modify('move', 'backward', 'word');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (selection as any).modify('extend', 'forward', 'word');
          result = selection.getRangeAt(0);
          if (selection.toString().endsWith(' ')) {
            result.setEnd(result.endContainer, result.endOffset - 1);
          }
        } else {
          result = null;
        }
      }
      selection.removeAllRanges();
    }
    chapterWrapper.style.userSelect = 'none';
  }
  return result;
}

export default selectWordFromPoint;