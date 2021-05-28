import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Typography, ListItem, ListItemText, ListItemIcon, List, Divider, Drawer } from '@material-ui/core';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import useStyles from './optionsDrawerStyles';
import { getUserBoards, getBoard } from '../../helpers/';
import { useKanban } from '../../context/useKanbanContext';
import { IBoard } from '../../interface/Board';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const OptionsDrawer = ({ open, setOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const { setActiveBoard } = useKanban();

  const fetchBoard = async (id: string): Promise<IBoard> => {
    const request = await getBoard(id);
    setActiveBoard(request);
    setOpen((prevOpen) => !prevOpen);

    return request;
  };

  const getAllUserBoards = async () => {
    const { boards } = await getUserBoards();
    if (boards) setBoards(boards);

    return undefined;
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
          <ListItem key={board._id} button onClick={() => fetchBoard(board._id)}>
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
