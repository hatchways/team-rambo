import { useState, MouseEvent } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { IColumn } from '../../../interface/Column';
import { useSnackBar } from '../../../context/useSnackbarContext';
import dialogActionButtonStyles from '../DialogActionButton/dialogActionButtonStyles';

type Props = {
  columns: IColumn[];
  name: string;
};

const DialogMenuButton = ({ columns, name }: Props): JSX.Element => {
  const classes = dialogActionButtonStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { updateSnackBarMessage } = useSnackBar();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    updateSnackBarMessage(`Choose a board to ${name.toLowerCase()} current card to`);
  };

  const handleMenuClose = (target: string) => {
    setAnchorEl(null);

    // checks to make sure target is actually a column name, then formats text for snackbar
    // depending on if the action ends in 'y' or not
    !target.toString().startsWith('[') &&
      updateSnackBarMessage(
        `${name.charAt(name.length - 1) === 'y' ? name : name.slice(0, -1)}ing to board: "${target}"`,
      );
  };

  return (
    <>
      <Button className={classes.columnButton} onClick={handleClick}>
        {name}
      </Button>
      <Menu id="move-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {columns.map((column) => {
          return (
            <MenuItem onClick={() => handleMenuClose(column.name)} key={`${column.name}-${column.id}`}>
              {column.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default DialogMenuButton;
