import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import useStyles from './boardAppBarStyles';
import { IBoard } from '../../interface';

interface BoardAppBarProps {
  activeBoard: IBoard;
  toggleDrawer: () => void;
}

export const BoardAppBar = ({ activeBoard, toggleDrawer }: BoardAppBarProps): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {activeBoard.name}
        </Typography>
        <IconButton
          onClick={toggleDrawer}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
