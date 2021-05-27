export interface IDialogItem {
  title?: string;
  content?: string;
  icon?: string;
  id?: string;
}

export interface IDialogItemContext {
  items: IDialogItem[];
  addItem: (item: IDialogItem) => boolean;
  removeItem: (itemId: string) => void;
  resetItems: () => boolean;
}
