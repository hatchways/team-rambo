import { ICard } from './Card';
export interface IDialogItem {
  content: string;
  icon: string;
  title?: string;
  id?: string;
  activeCard?: ICard;
}
