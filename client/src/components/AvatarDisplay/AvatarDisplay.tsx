import { useState, MouseEvent } from 'react';
import { Avatar, Menu, MenuItem, CircularProgress } from '@material-ui/core';
import PictureModal from '../PictureModal/PictureModal';
import { useAuth, useUser } from '../../context/';
import useStyles from './useStyles';

const AvatarDisplay = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();
  const { picture } = useUser();
  const classes = useStyles();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleProfile = () => {
    setOpenImageModal((prevOpen) => !prevOpen);
    setAnchorEl(null);
    // To do: implement component for profile page and backend routing
  };

  return (
    <div>
      {picture ? (
        <Avatar
          alt="Profile Image"
          src={picture.url}
          aria-label="show auth menu"
          aria-controls="auth-menu"
          aria-haspopup="true"
          className={classes.medium}
          onClick={handleClick}
        ></Avatar>
      ) : (
        <CircularProgress color="primary"></CircularProgress>
      )}

      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
      </Menu>
      <PictureModal open={openImageModal} setOpen={handleProfile} />
    </div>
  );
};

export default AvatarDisplay;
