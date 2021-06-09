import { useState, MouseEvent } from 'react';
import { Avatar, Menu, MenuItem, ListItemText, ListItemIcon, AvatarProps } from '@material-ui/core';
import { AccountCircle, PowerSettingsNew } from '@material-ui/icons';
import { useAuth, useUser } from '../../context/';
import PictureModal from '../PictureModal/PictureModal';
import useStyles from './useStyles';
import profileFallback from '../../Images/profileFallback.png';

const AvatarDisplay = (avatarProps: AvatarProps): JSX.Element => {
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
    closeImageModal();
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleProfile = () => {
    setOpenImageModal(true);
    // To do: implement component for profile page and backend routing
  };

  const closeImageModal = () => {
    setOpenImageModal(false);
  };

  return (
    <div>
      <Avatar
        alt="Profile Image"
        src={picture?.url || profileFallback}
        aria-label="show auth menu"
        aria-controls="auth-menu"
        aria-haspopup="true"
        className={classes.medium}
        onClick={handleClick}
        {...avatarProps}
      ></Avatar>
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
        <MenuItem onClick={handleProfile}>
          <ListItemIcon className={classes.listItemIcon}>
            <AccountCircle color="primary" />
          </ListItemIcon>
          <ListItemText className={classes.listItemText}>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon className={classes.listItemIcon}>
            <PowerSettingsNew color="primary" />
          </ListItemIcon>
          <ListItemText className={classes.listItemText}>Logout</ListItemText>
        </MenuItem>
      </Menu>
      <PictureModal open={openImageModal} onClose={closeImageModal} />
    </div>
  );
};

export default AvatarDisplay;
