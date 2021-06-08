import { List, ListItemAvatar, ListItem, ListItemText, Avatar } from '@material-ui/core';

export const TeamDialogList = (): JSX.Element => (
  <List>
    <ListItem button>
      <ListItemAvatar>
        <Avatar>R</Avatar>
      </ListItemAvatar>
      <ListItemText primary="Rambo" />
    </ListItem>
    <ListItem button>
      <ListItemAvatar>
        <Avatar>J</Avatar>
      </ListItemAvatar>
      <ListItemText primary="Jambo" />
    </ListItem>
    <ListItem button>
      <ListItemAvatar>
        <Avatar>B</Avatar>
      </ListItemAvatar>
      <ListItemText primary="Bambo" />
    </ListItem>
  </List>
);
