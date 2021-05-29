import { IDialogItem } from './DialogItem';

export interface IDialogItemContext {
  items: IDialogItem[];
  addItem: (item: IDialogItem) => boolean;
  removeItem: (itemId: string) => void;
  resetItems: () => boolean;
}
