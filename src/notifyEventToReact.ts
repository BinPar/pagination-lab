/* eslint-disable @typescript-eslint/no-explicit-any */
import { ViewerEvent } from './model/Events';

/**
 * Notify any event to the react native layer
 * @param event {ViewerEvent} event information
 */
const notifyEventToReact = (event: ViewerEvent): void => {
  if ((window as any).ReactNativeWebView) {
    (window as any).ReactNativeWebView.postMessage(JSON.stringify(event));
  } else {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(event));
  }
};

export default notifyEventToReact;
