import { getSettings } from './settings';
import recalculateColumnConfig from './recalculateColumnConfig';

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