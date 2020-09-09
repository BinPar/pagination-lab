import getRangeFromPoint from "./getRangeFromPoint";

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
    chapterWrapper.style.userSelect = 'auto';
    const range = getRangeFromPoint(ev);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (selection as any).modify('move', 'backward', 'word');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (selection as any).modify('extend', 'forward', 'word');
      result = selection.getRangeAt(0);
      selection.removeAllRanges();
    }
    chapterWrapper.style.userSelect = 'none';
  }
  return result;
}

export default selectWordFromPoint;