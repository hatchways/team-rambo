import { IDialogItem } from './';

export default interface IDialogItemContext {
  items: IDialogItem[];
  addItem: (item: IDialogItem) => void;
  removeItem: (itemId: string) => void;
  resetItems: () => void;
  hasItem: (itemContent: string) => boolean;
}
