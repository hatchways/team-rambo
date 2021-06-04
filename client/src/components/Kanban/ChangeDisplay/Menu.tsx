import React from 'react';
import { withStyles, Button, Grid, Menu, MenuProps, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import useStyles from '../../../pages/Dashboard/dashboardStyles';
import { RiDashboardLine } from 'react-icons/ri';
import { BsCalendar } from 'react-icons/bs';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface CustomMenuProps {
  setIsBoard: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomizedMenus = ({ setIsBoard }: CustomMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const selectCalendar = () => {
    handleClose();
    setIsBoard(false);
  };

  const selectBoard = () => {
    handleClose();
    setIsBoard(true);
  };

  const classes = useStyles();

  return (
    <Grid item className={classes.changeDisplay}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Change Display
      </Button>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem onClick={selectBoard}>
          <ListItemIcon>
            <RiDashboardLine fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Board View" />
        </StyledMenuItem>
        <StyledMenuItem onClick={selectCalendar}>
          <ListItemIcon>
            <BsCalendar fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Calendar View" />
        </StyledMenuItem>
      </StyledMenu>
    </Grid>
  );
};

export default CustomizedMenus;
