import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsDrawer = ({ open, setOpen }: Props): JSX.Element => {
  return (
    <Drawer anchor={'right'} open={open} onClose={setOpen}>
      <List>
        <ListItem>
          <Typography>Hello</Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default OptionsDrawer;
