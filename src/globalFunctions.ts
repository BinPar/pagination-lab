import { getSettings, updateSettings } from './settings';
import recalculateColumnConfig from './recalculateColumnConfig';
import updateFontInfo from './updateFontInfo';

/**
 * Sets the horizontal or vertical mode
 * @param verticalScroll true if we need to use vertical scroll
 */
export const setVerticalMode = (verticalScroll: boolean): void => {
  updateSettings({ verticalScroll });
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
        `body > .zoomPanel > .chapterWrapper [data-page="${
          getSettings().currentPage
        }"]`,
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
    document.documentElement.style.setProperty('--viewerSnapType', `none`);
    const scrollFix = (document.body.scrollLeft * -1) / 3;
    updateSettings({ scrollFix, animateEnabled: false });
    document.documentElement.style.setProperty(
      '--horizontalScrollFix',
      `${getSettings().scrollFix}px`,
    );
    updateSettings({ handleZoomAnimation: true });
  }
};

/**
 * Sets the Night mode of the viewer
 * @param invertViewerColor true for night mode false for day mode
 */
export const setNightMode = (invertViewerColor: boolean): void => {
  if (!getSettings().handleZoomAnimation) {
    updateSettings({ invertViewerColor });
    document.documentElement.style.setProperty(
      '--invertViewerColor',
      `${invertViewerColor ? 1 : 0}`,
    );
  }
};

/**
 * Sets the Night mode of the viewer
 * @param sepiaViewerColor true for sepia mode false for normal mode
 */
export const setSepiaMode = (sepiaViewerColor: boolean): void => {
  if (!getSettings().handleZoomAnimation) {
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
};

/**
 * Sets the font size of the text
 * @param currentFontSize {number} size of the font to use (in pixels)
 */
export const setFontSize = (currentFontSize: number): void => {
  if (!getSettings().handleZoomAnimation) {
    updateSettings({ currentFontSize });
    updateFontInfo();
  }
};

/**
 * Sets the line height of the text
 * @param lineHeight {number} line height in em
 */
export const setLineHeight = (lineHeight: number): void => {
  if (!getSettings().handleZoomAnimation) {
    updateSettings({ lineHeight });
    updateFontInfo();
  }
};

/**
 * Sets the default typography
 * @param currentFont {string} font family name to set (baskerville-enc, helvetica-enc, americanTypewriter-enc...)
 */
export const setDefaultTypography = (currentFont: string): void => {
  if (!getSettings().handleZoomAnimation) {
    updateSettings({ currentFont });
    document.body.className = `viewer epub ${getSettings().currentFont}${
      getSettings().verticalScroll ? ' vertical' : ''
    }`;
    updateFontInfo();
  }
};

/**
 * Global object that stores the viewer api interface
 */
const flowViewer = {
  setVerticalMode,
  setSepiaMode,
  setNightMode,
  setFontSize,
  setLineHeight,
  setDefaultTypography,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).flowViewer = flowViewer;
