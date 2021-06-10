import { Grid } from '@material-ui/core';
import { useDialog } from '../../../context';
import { IDialogItem, ICard } from '../../../interface';
import DialogItem from '../DialogItem/DialogItem';

type DialogItemGroupProps = {
  activeCard: ICard;
};
const DialogItemGroup = ({ activeCard }: DialogItemGroupProps): JSX.Element => {
  const { items } = useDialog();
  return (
    <Grid container>
      {items.map((item: IDialogItem) => (
        <DialogItem key={item.id} item={item} activeCard={activeCard} />
      ))}
    </Grid>
  );
};

export default DialogItemGroup;
