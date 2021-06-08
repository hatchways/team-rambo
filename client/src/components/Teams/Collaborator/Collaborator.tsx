import { Avatar, Grid, Paper, Typography, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { useState, MouseEvent } from 'react';
import useStyles from './collaboratorStyles';

interface CollaboratorProps {
  profile?: string;
  name: string;
  email: string;
}

export const Collaborator = ({ profile, name, email }: CollaboratorProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar className={classes.largeAvatar}>{!profile && 'E'}</Avatar>
            </Grid>
            <Grid item>
              <Box className={classes.collaboratorInfo}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body1">{email}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton onClick={handleClick}>
            <MoreHoriz />
          </IconButton>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose} elevation={2} keepMounted>
            <MenuItem>Add to Board</MenuItem>
            <MenuItem>Remove from Team</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Paper>
  );
};
