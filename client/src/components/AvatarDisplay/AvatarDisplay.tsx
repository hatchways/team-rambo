import { useState, MouseEvent } from 'react';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import PictureModal from '../PictureModal/PictureModal';
import { User } from '../../interface/User';
import useStyles from './useStyles';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();
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
        src={`https://robohash.org/${user.email}.png`}
        aria-label="show auth menu"
        aria-controls="auth-menu"
        aria-haspopup="true"
        className={classes.medium}
        onClick={handleClick}
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
      </Menu>
      <PictureModal open={openImageModal} onClose={closeImageModal} />
    </div>
  );
};

export default AvatarDisplay;
