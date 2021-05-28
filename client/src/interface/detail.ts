export interface IDialogItem {
  title?: string;
  content: string;
  icon?: string;
  id?: string;
}

export interface IDialogItemContext {
  items: IDialogItem[];
  addItem: (item: IDialogItem) => void;
  removeItem: (itemId: string) => void;
  resetItems: () => void;
  hasItem: (itemContent: string) => boolean;
}
