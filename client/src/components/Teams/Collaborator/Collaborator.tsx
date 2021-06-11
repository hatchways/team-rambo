import { Avatar, Grid, Paper, Typography, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { useState, MouseEvent } from 'react';
import { ICollaborator } from '../../../interface';
import useStyles from './collaboratorStyles';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  collaborator: ICollaborator;
}

export const Collaborator = ({ index, collaborator }: Props): JSX.Element => {
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
    <Draggable draggableId={collaborator.email} index={index}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
            <Paper elevation={0} className={classes.paper}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar className={classes.largeAvatar} src={collaborator.picture.url}></Avatar>
                    </Grid>
                    <Grid item>
                      <Box className={classes.collaboratorInfo}>
                        <Typography variant="h6">{collaborator.name}</Typography>
                        <Typography variant="body1">{collaborator.email}</Typography>
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
          </div>
        );
      }}
    </Draggable>
  );
};
