import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Typography, ListItem, ListItemText, ListItemIcon, List, Divider, Drawer } from '@material-ui/core';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import useStyles from './optionsDrawerStyles';
import { getUserBoards } from '../../helpers/';
import { useKanban } from '../../context/useKanbanContext';
import { IBoard } from '../../interface/';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const OptionsDrawer = ({ open, setOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const { fetchBoard } = useKanban();

  const getAllUserBoards = async () => {
    const { boards } = await getUserBoards();
    if (boards) setBoards(boards);

    return undefined;
  };

  const fetchAndSet = async (board: IBoard) => {
    fetchBoard(board._id).then(() => setOpen((prevOpen) => !prevOpen));
  };

  useEffect(() => {
    getAllUserBoards();
  }, []);

  return (
    <Drawer anchor={'right'} open={open} onClose={setOpen}>
      <List className={classes.list}>
        <ListItem>
          <ListItemText
            primary={<Typography className={classes.title}>Boards</Typography>}
            className={classes.primary}
          />
        </ListItem>
        <Divider />
        {boards.map((board) => (
          <ListItem key={board._id} button onClick={() => fetchAndSet(board)}>
            <ListItemIcon>
              <SwapHorizontalCircleOutlinedIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography className={classes.primary}>{board.name}</Typography>}
              className={classes.primary}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default OptionsDrawer;
