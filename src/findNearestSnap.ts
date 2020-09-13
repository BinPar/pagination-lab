/**
 * Find the nearest snap point to the current position
 * @param currentPosition X position used to find the nearest snap
 * @returns {number} x position of the nearest snap
 */
const findNearestSnap = (currentPosition: number): number => {
  let result = 0;
  let minDistance = Number.MAX_VALUE;
  document.body.querySelectorAll<HTMLDivElement>('body > .pageSnaps > .scrollSnap')
    .forEach((snap): void => {
      const left = Number.parseFloat(snap.style.left);
      const distance = Math.abs(currentPosition-left);
      // New best candidate
      if (distance < minDistance) {
        result = left;
        minDistance = distance;
      }
    });
  return result;
}

export default findNearestSnap;