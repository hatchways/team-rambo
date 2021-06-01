import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PictureModal from '../PictureModal/PictureModal';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import { useState, MouseEvent } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useUser } from '../../context/useUserContext';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
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
      <Avatar
        alt="Profile Image"
        src={picture ? picture : `https://robohash.org/${user.email}.png`}
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
      <PictureModal open={openImageModal} setOpen={handleProfile} />
    </div>
  );
};

export default AvatarDisplay;
