import { getSettings, updateSettings } from './settings';
import recalculateColumnConfig from './recalculateColumnConfig';
import getDomUI from './getDomUI';
import updateFontInfo from './updateFontInfo';

const setupButtonsEvents = (): void => {
  const domUI = getDomUI();

  domUI.verticalScrollButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    updateSettings({ verticalScroll: !getSettings().verticalScroll });
    document.body.className = `viewer epub ${getSettings().currentFont}${
      getSettings().verticalScroll ? ' vertical' : ''
      }`;
    if (getSettings().verticalScroll) {
      document.documentElement.style.setProperty('--animationSpeed', `0s`);
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.overflowX = 'none';
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      setTimeout((): void => {
        const pageIndicator = document.body.querySelector(
          `body > .zoomPanel > .chapterWrapper [data-page="${getSettings().currentPage}"]`,
        );
        if (pageIndicator) {
          document.documentElement.scrollTo(
            0,
            pageIndicator.getBoundingClientRect().top,
          );
        }
        recalculateColumnConfig(true);
      }, 0);
    } else {
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      document.documentElement.style.setProperty('--animationSpeed', `0.5s`);
      document.documentElement.style.overflowY = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      recalculateColumnConfig(true);
      updateSettings({ readMode: true });
      if (domUI.zoomPanel && domUI.buttonsPanel) {
        document.documentElement.style.setProperty('--viewerSnapType', `none`);
        const scrollFix = (document.body.scrollLeft * -1) / 3;
        updateSettings({ scrollFix, animateEnabled: false });
        document.documentElement.style.setProperty(
          '--horizontalScrollFix',
          `${getSettings().scrollFix}px`,
        );
        updateSettings({ handleZoomAnimation: true });
        domUI.zoomPanel.className = `zoomPanel${getSettings().readMode ? ' zoom' : ''}`;
        domUI.buttonsPanel.className = `buttons${getSettings().readMode ? ' zoom' : ''}`;
      }
    }
  });
  domUI.fullScreenModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  });
  domUI.nightModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (!getSettings().handleZoomAnimation) {
      let { invertViewerColor } = getSettings();
      invertViewerColor = !invertViewerColor;
      updateSettings({ invertViewerColor });
      document.documentElement.style.setProperty(
        '--invertViewerColor',
        `${invertViewerColor ? 1 : 0}`,
      );
    }
  });
  domUI.sepiaModeButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    if (!getSettings().handleZoomAnimation) {
      let { sepiaViewerColor } = getSettings();
      sepiaViewerColor = !sepiaViewerColor;
      updateSettings({ sepiaViewerColor });
      document.documentElement.style.setProperty(
        '--sepiaViewerColor',
        `${sepiaViewerColor ? 1 : 0}`,
      );
      document.documentElement.style.setProperty(
        '--contrastViewerColor',
        `${sepiaViewerColor ? 0.6 : 1}`,
      );
    }
  });
  domUI.increaseFontButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { currentFontSize } = getSettings();
    if (currentFontSize < 32) {
      currentFontSize += 2;
      updateSettings({ currentFontSize });
      updateFontInfo();
    }
  });
  domUI.decreaseFontButton?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { currentFontSize } = getSettings();
    if (currentFontSize > 8) {
      currentFontSize -= 2;
      updateSettings({ currentFontSize });
      updateFontInfo();
    }
  });
  domUI.increaseLineHeight?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { lineHeight } = getSettings();
    if (lineHeight < 2) {
      lineHeight += 0.1;
      updateSettings({ lineHeight });
      updateFontInfo();
    }
  });
  domUI.decreaseLineHeight?.addEventListener('click', (ev: Event): void => {
    ev.preventDefault();
    ev.stopPropagation();
    let { lineHeight } = getSettings();
    if (lineHeight > 1) {
      lineHeight -= 0.1;
      updateSettings({ lineHeight });
      updateFontInfo();
    }
  });
}

export default setupButtonsEvents;