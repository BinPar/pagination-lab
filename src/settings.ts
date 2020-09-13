import Settings from './model/Settings';

/**
 * Viewer default settings
 */
const initialSettings: Settings = {
  currentFontSize: 18,
  columnWidth: 0,
  totalColumns: 0,
  scrollFix: 0,
  currentPage: '',
  pagesPerColumn: [],
  readMode: true,
  animateEnabled: true,
  invertViewerColor: false,
  sepiaViewerColor: false,
  lineHeight: 1.5,
  verticalScroll: false,
  currentFont: 'baskerville-enc',
  verticalPageMarkers: [],
  handleZoomAnimation: false,
  currentSelection: null,
  disableContextMenu: true,
  debugSelectOnHover: false,
  draggingSelection: false,
};

/**
 * Current setting value
 */
let settings = initialSettings;

/**
 * Reset settings to the initial value
 * @returns {Settings} current settings
 */
export const resetSettings = (): Settings => {
  settings = initialSettings;
  return settings;
}

/**
 * Gets current settings value
 * @returns {Settings} current settings
 */
export const getSettings = (): Settings => settings

/**
 * Updates the settings to a new value
 * @param newSettings {Partial<Settings>} new settings values to set
 * @returns {Settings} current settings
 */
export const updateSettings = (newSettings: Partial<Settings>): Settings => {
  settings = {
    ...settings,
    ...newSettings
  };
  return settings;
}