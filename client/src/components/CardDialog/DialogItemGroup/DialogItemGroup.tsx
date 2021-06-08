import { Grid } from '@material-ui/core';
import { IDialogItem, ICard } from '../../../interface';
import DialogItem from '../DialogItem/DialogItem';

type DialogItemGroupProps = {
  items: IDialogItem[];
  activeCard: ICard;
};
const DialogItemGroup = ({ items, activeCard }: DialogItemGroupProps): JSX.Element => {
  return (
    <Grid container>
      {items.map((item: IDialogItem) => {
        return (
          <>
            <div>{activeCard.description}</div>
            <DialogItem
              key={item.id}
              title={item.title}
              content={item.content}
              icon={item.icon}
              id={item.id}
              activeCard={activeCard}
            />
          </>
        );
      })}
    </Grid>
  );
};

export default DialogItemGroup;
