export default interface Settings {
  currentFontSize: number;
  totalColumns: number;
  currentPage: string;
  columnWidth: number;
  pagesPerColumn: string[];
  verticalPageMarkers: { top: number; page: string }[];
  readMode: boolean;
  animateEnabled: boolean;
  invertViewerColor: boolean;
  sepiaViewerColor: boolean;
  scrollFix: number;
  lineHeight: number;
  verticalScroll: boolean;
  currentFont: string;
  handleZoomAnimation: boolean;
  currentSelection: Range | null;
};