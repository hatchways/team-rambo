import { useState, MouseEvent } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useSnackBar, useKanban } from '../../../context';
import dialogActionButtonStyles from '../DialogActionButton/dialogActionButtonStyles';

type Props = {
  name: string;
};

const DialogMenuButton = ({ name }: Props): JSX.Element => {
  const classes = dialogActionButtonStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { updateSnackBarMessage } = useSnackBar();
  const { activeBoard, moveCard, copyCard, removeCard, getColumnById, focusedCard, resetOpenCard } = useKanban();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    updateSnackBarMessage(`Choose a column to ${name.toLowerCase()} current card to`);
  };

  const handleMenuClose = (target: string) => {
    setAnchorEl(null);

    // checks to make sure target is actually a column name, then formats text for snackbar
    // depending on if the action ends in 'y' or not
    !target.toString().startsWith('[') &&
      updateSnackBarMessage(
        `${name.charAt(name.length - 1) === 'y' ? name : name.slice(0, -1)}ing to column: "${
          getColumnById(target).name
        }"`,
      );

    switch (name) {
      case 'Move':
        if (getColumnById(target) !== null) {
          if (target === focusedCard?.columnId)
            updateSnackBarMessage("Can't move a card to its own column!", 'warning');
          else {
            moveCard(getColumnById(target));
            resetOpenCard();
          }
        }
        break;
      case 'Copy':
        if (getColumnById(target) !== null) {
          copyCard(getColumnById(target));
          resetOpenCard();
        }
        break;
      case 'Delete':
        updateSnackBarMessage(`Deleting card: "${focusedCard?.title}"`);
        if (focusedCard) {
          removeCard(focusedCard?._id);
          resetOpenCard();
        }
        break;
      default:
        return;
    }
  };

  if (name !== 'Delete') {
    return (
      <>
        <Button className={classes.columnButton} onClick={handleClick}>
          {name}
        </Button>
        <Menu id="move-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {activeBoard.columns.map((column) => {
            return (
              <MenuItem onClick={() => handleMenuClose(column._id)} key={`${column.name}-${column._id}`}>
                {column.name}
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  } else {
    return (
      <>
        <Button className={classes.columnButton} onClick={() => focusedCard && handleMenuClose(focusedCard?.columnId)}>
          {name}
        </Button>
      </>
    );
  }
};

export default DialogMenuButton;
