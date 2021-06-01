import { Grid } from '@material-ui/core';
import { IDialogItem } from '../../../context/types/detail';
import DialogItem from '../DialogItem/DialogItem';

//type DialogItemGroupProps = IDialogItemGroup;
type DialogItemGroupProps = {
  items: IDialogItem[];
};
const DialogItemGroup = ({ items }: DialogItemGroupProps): JSX.Element => {
  return (
    <Grid container xs={10}>
      {items.map((item: IDialogItem) => {
        return <DialogItem key={item.id} title={item.title} content={item.content} icon={item.icon} id={item.id} />;
      })}
    </Grid>
  );
};

export default DialogItemGroup;
