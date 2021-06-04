import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  board: {
    marginTop: 20,
  },
  buttonOverlay: {
    position: 'absolute',
    marginTop: 30,
    width: '100%',
    pointerEvents: 'none',
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  drawerWrapper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
  changeDisplay: {
    marginBlock: 30,
    width: '83%',
    margin: '0 auto',
  },
  calendar: {
    width: '83%',
    margin: '0 auto',
  },
  calendarEvent: {
    height: '100px',
  },
}));

export default useStyles;
