import { ICard } from './Card';
export interface IDialogItem {
  title?: string;
  content: string;
  icon?: string;
  id?: string;
  activeCard?: ICard;
}
