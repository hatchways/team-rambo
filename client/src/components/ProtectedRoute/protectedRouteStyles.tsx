import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
