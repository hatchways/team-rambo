import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  board: {
    marginTop: 30,
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
  loadingScreen: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingScreenText: {
    fontWeight: 'bolder',
  },
}));

export default useStyles;
