import { Grid } from '@material-ui/core';
import { IDialogItem } from '../../../interface';
import DialogItem from '../DialogItem/DialogItem';

type DialogItemGroupProps = {
  items: IDialogItem[];
};
const DialogItemGroup = ({ items }: DialogItemGroupProps): JSX.Element => {
  return (
    <Grid container>
      {items.map((item: IDialogItem) => {
        return <DialogItem key={item.id} title={item.title} content={item.content} icon={item.icon} id={item.id} />;
      })}
    </Grid>
  );
};

export default DialogItemGroup;
