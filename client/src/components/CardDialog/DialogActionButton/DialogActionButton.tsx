import { Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useDialog } from '../../../context/useDialogContext';
import dialogActionButtonStyles from './dialogActionButtonStyles';

type Props = {
  title: string;
  content: string;
  icon: string;
};

const DialogActionButton = ({ title, content, icon }: Props): JSX.Element => {
  const { hasItem, addItem, removeItem } = useDialog();
  const classes = dialogActionButtonStyles();

  return (
    <Button
      className={hasItem(content) ? classes.columnButtonActive : classes.columnButton}
      onClick={() => {
        if (!hasItem(content)) {
          addItem({
            title: `${title}:`,
            content: content,
            icon: icon,
            id: uuidv4(),
          });
        } else removeItem(content);
      }}
    >
      {title}
    </Button>
  );
};

export default DialogActionButton;
