export interface PageChangeEvent {
  type: 'onPageChange';
  pageNumber: string;
}

export interface SelectionChangeEvent {
  type: 'onSelectionChange';
}

export type ViewerEvent = PageChangeEvent | SelectionChangeEvent;