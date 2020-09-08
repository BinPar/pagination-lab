import { UIElements } from "./model/UIElements";

/**
 * Internal dictionary of elements
 */
let elements: Map<string, HTMLElement>;


/**
 * Adds the element only if the dom node exists
 * @param name name to the elemento to add
 * @param item dom node
 */
export const addToMap = (name: string, item: HTMLElement | null): void => {
  if (item) {
    elements.set(name, item);
  }
}

/**
 * Gets the user interface elements from the DOM of the current page
 */
const getDomUI = (): UIElements => {
  if (!elements) {
    elements = new Map<string, HTMLElement>();

    addToMap('pageNumberBtn', document.getElementById('pageNumber'));

    addToMap('zoomPanel', document.body.querySelector(
      'body > .zoomPanel',
    ));

    addToMap('buttonsPanel', document.body.querySelector(
      'body > .buttons',
    ));

    addToMap('fullScreenModeButton', document.body.querySelector(
      'body > .buttons > .fullScreenModeButton',
    ));

    addToMap('increaseFontButton', document.body.querySelector(
      'body > .buttons > .increaseFontButton',
    ));

    addToMap('decreaseFontButton', document.body.querySelector(
      'body > .buttons > .decreaseFontButton',
    ));

    addToMap('increaseLineHeight', document.body.querySelector(
      'body > .buttons > .increaseLineHeight',
    ));

    addToMap('decreaseLineHeight', document.body.querySelector(
      'body > .buttons > .decreaseLineHeight',
    ));

    addToMap('nightModeButton', document.body.querySelector(
      'body > .buttons > .nightModeButton',
    ));

    addToMap('sepiaModeButton', document.body.querySelector(
      'body > .buttons > .sepiaModeButton',
    ));

    addToMap('verticalScrollButton', document.body.querySelector(
      'body > .buttons > .verticalScrollButton',
    ));
  }

  return {
    pageNumberBtn: elements.get('pageNumberBtn'),
    zoomPanel: elements.get('zoomPanel') as HTMLDivElement,
    buttonsPanel: elements.get('buttonsPanel') as HTMLDivElement,
    fullScreenModeButton: elements.get('fullScreenModeButton'),
    increaseFontButton: elements.get('increaseFontButton'),
    decreaseFontButton: elements.get('decreaseFontButton'),
    increaseLineHeight: elements.get('increaseLineHeight'),
    decreaseLineHeight: elements.get('decreaseLineHeight'),
    nightModeButton: elements.get('nightModeButton'),
    sepiaModeButton: elements.get('sepiaModeButton'),
    verticalScrollButton: elements.get('verticalScrollButton'),
  }
};

export default getDomUI;