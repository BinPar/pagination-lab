/**
 * Clears current window text selection
 */
const clearSelection = (): void => {
  if (window && window.getSelection) {
    const selection = window.getSelection();
    if (selection) {
      if (selection.empty) {  // Chrome
        selection.empty();
      } else if (selection.removeAllRanges) {  // Firefox
        selection.removeAllRanges();
      }
    }
  }
};

export default clearSelection;