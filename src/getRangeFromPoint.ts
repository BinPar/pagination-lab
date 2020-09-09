/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This is crazy... the selection from point is not standard jet
 * it took some time to figure out how to do it in the diferent
 * browsers (old scool JS) but I think that it covers every broswer 
 * (at least for the Bi-Books needs), if anywone detects any improvemenet
 * for any browser please do a pool request
 * @param evt {MouseEvent} Mouse event to do the selection
 * @returns Selection Range
 */
const getRangeFromPoint = (evt: any): Range => {
  let range: any;
  const x = evt.clientX;
  const y = evt.clientY;

  const body = document.body as any;

  // Try the simple IE way first
  if (body.createTextRange) {
    range = body.createTextRange();
    range.moveToPoint(x, y);
  } else if (typeof document.createRange !== "undefined") {
    // Try Mozilla's rangeOffset and rangeParent properties, which are exactly what we want
    if (typeof evt.rangeParent !== "undefined") {
      range = document.createRange();
      range.setStart(evt.rangeParent, evt.rangeOffset);
      range.collapse(true);
    }

    // Try the standards-based way next
    else if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(x, y) as any;
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.collapse(true);
    }

    // Next, the WebKit way
    else if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(x, y);
    }
  }
  return range as Range;
}

export default getRangeFromPoint;