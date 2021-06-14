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
  calendarBox: {
    display: 'flex',
    width: '90%',
    margin: '2% auto',
    justifyContent: 'space-between',
  },
  leftBoxTypo: {
    fontSize: 20,
  },
  leftBox: {
    width: '90%',
    border: '1px solid #ccc',
    marginTop: '8%',
    minHeight: '200px',
  },
  calendarMain: {
    width: '100%',
    margin: '0 auto',
  },
  calendar: {
    width: '85%',
  },
  calendarEvent: {
    height: '30px',
  },
  loading: {
    textAlign: 'center',
  },
  card: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    width: '95%',
    margin: '2% auto',
    height: '30px',
  },
}));

export default useStyles;
