export interface SyntheticEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rangeParent: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rangeOffset: any;
  clientX: number;
  clientY: number;
}

/**
 * Generates a synthetic event from a mouse event
 * @param ev Mouse event to generate the synthetic event
 */
export const fromMouseEvent = (ev: MouseEvent): SyntheticEvent => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {rangeParent, rangeOffset} = ev as any;
  const {clientX, clientY}  = ev;
  return {
    rangeParent,
    rangeOffset,
    clientX,
    clientY,
  };
}
/**
 * Generates a synthetic event from a touch event
 * @param ev Touch event to generate the synthetic event
 */
export const fromTouchEvent = (ev: TouchEvent): SyntheticEvent => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {rangeParent, rangeOffset} = ev as any;
  const {clientX, clientY}  = ev.touches[0];
  return {
    rangeParent,
    rangeOffset,
    clientX,
    clientY,
  };
}
