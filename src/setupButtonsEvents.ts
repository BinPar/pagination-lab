import { getSettings, updateSettings } from './settings';
import getDomUI from './getDomUI';
import updateFontInfo from './updateFontInfo';
import { setVerticalMode, setNightMode, setSepiaMode, setFontSize, setLineHeight } from './globalFunctions';

/**
 * Setups all the buttons actions
 */
const setupButtonsEvents = (): void => {
  const domUI = getDomUI();

  /**
   * Vertical / horizontal reading toggle
   */
  domUI.verticalScrollButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    setVerticalMode(!getSettings().verticalScroll);
    if (domUI.zoomPanel && domUI.buttonsPanel) {
      domUI.zoomPanel.className = `zoomPanel${
        getSettings().readMode ? ' zoom' : ''
      }`;
      domUI.buttonsPanel.className = `buttons${
        getSettings().readMode ? ' zoom' : ''
      }`;
    }
  });

  /**
   * Full Screen Mode
   */
  domUI.fullScreenModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  });

  /**
   * Night Mode Toggle
   */
  domUI.nightModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    setNightMode(!getSettings().invertViewerColor);
  });

  /**
   * Sepia Mode Toggle
   */
  domUI.sepiaModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    setSepiaMode(!getSettings().sepiaViewerColor);
  });

  /**
   * Increase font size
   */
  domUI.increaseFontButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { currentFontSize } = getSettings();
    if (currentFontSize < 32) {
      currentFontSize += 2;
      setFontSize(currentFontSize);      
    }
  });

  /**
   * Decrease font size
   */
  domUI.decreaseFontButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { currentFontSize } = getSettings();
    if (currentFontSize > 8) {
      currentFontSize -= 2;
      setFontSize(currentFontSize);
    }
  });

  /**
   * Increase line height
   */
  domUI.increaseLineHeight?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { lineHeight } = getSettings();
    if (lineHeight < 2) {      
      lineHeight += 0.1;
      setLineHeight(lineHeight);
    }
  });

  /**
   * Decrease line height
   */
  domUI.decreaseLineHeight?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { lineHeight } = getSettings();
    if (lineHeight > 1) {
      lineHeight -= 0.1;
      setLineHeight(lineHeight);
    }
  });

  /**
   * Typography selection
   */
  document.body
    .querySelectorAll<HTMLButtonElement>('body > .buttons > .selectTypography')
    .forEach((button): void => {
      button?.addEventListener('click', (ev: Event): void => {
        ev.preventDefault();
        ev.stopPropagation();
        updateSettings({ currentFont: button.value });
        document.body.className = `viewer epub ${getSettings().currentFont}${
          getSettings().verticalScroll ? ' vertical' : ''
        }`;
        updateFontInfo();
      });
    });
};

export default setupButtonsEvents;
