import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
