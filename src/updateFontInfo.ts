import { getSettings } from './settings';
import recalculateColumnConfig from './recalculateColumnConfig';

/**
 * Updates the font style properties and
 * recalculates the column config for the
 * new settings
 */
const updateFontInfo  = (): void => {
  document.documentElement.style.setProperty(
    '--fontSize',
    `${getSettings().currentFontSize}px`,
  );
  document.documentElement.style.setProperty(
    '--lineHeight',
    `${getSettings().lineHeight}em`,
  );
  recalculateColumnConfig(true);
};

export default updateFontInfo;