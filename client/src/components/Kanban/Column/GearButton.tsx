import { MouseEvent } from 'react';
import { IconButton, MenuItem, Menu } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

interface GearProps {
  anchorEl: HTMLElement | null;
  openMenu: (event: MouseEvent<HTMLButtonElement>) => void;
  closeMenu: () => void;
  toggleRenaming: () => void;
  openConfirm: () => void;
}

const GearButton = ({ anchorEl, openMenu, closeMenu, toggleRenaming, openConfirm }: GearProps): JSX.Element => (
  <>
    <IconButton onClick={openMenu}>
      <SettingsIcon />
    </IconButton>
    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
      <MenuItem onClick={toggleRenaming}>Rename</MenuItem>
      <MenuItem onClick={openConfirm}>Remove</MenuItem>
    </Menu>
  </>
);

export default GearButton;
