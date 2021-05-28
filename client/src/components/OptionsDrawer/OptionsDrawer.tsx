import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import useStyles from './optionsDrawerStyles';
import getUserBoards from '../../helpers/APICalls/getUserBoards';
import getBoard from '../../helpers/APICalls/getBoard';
import { IBoard } from '../../context/types/kanban';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setActiveBoard: Dispatch<SetStateAction<IBoard | null>>;
}

const OptionsDrawer = ({ open, setActiveBoard, setOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const [boards, setBoards] = useState<Array<IBoard>>([]);

  const fetchBoard = async (id: string): Promise<IBoard> => {
    const request = await getBoard(id);
    setActiveBoard(request);

    return request;
  };

  const getAllUserBoards = async () => {
    const { boards } = await getUserBoards();
    if (boards) setBoards(boards);
  };

  useEffect(() => {
    getAllUserBoards();
  }, []);

  // On click of the item, should set our active board

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
