import { Button } from '@material-ui/core';
import { useDialog } from '../../../context/useDialogContext';
import dialogActionButtonStyles from './dialogActionButtonStyles';

type Props = {
  title: string;
  content: string;
  icon: string;
};

const DialogActionButton = ({ title, content, icon }: Props): JSX.Element => {
  const { hasItem, addItem } = useDialog();
  const classes = dialogActionButtonStyles();

  return (
    <Button
      className={hasItem(content) ? classes.columnButtonActive : classes.columnButton}
      disabled={hasItem(content)}
      onClick={() => {
        addItem({
          title: `${title}:`,
          content: content,
          icon: icon,
          id: `item-${Math.floor(Math.random() * 999999)}`,
        });
      }}
    >
      {title}
    </Button>
  );
};

export default DialogActionButton;
