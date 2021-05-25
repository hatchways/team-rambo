import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'bolder',
    textAlign: 'center',
  },
  primary: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  list: {
    width: 200,
  },
  icon: {
    color: theme.palette.primary.main,
    paddingRight: 0,
  },
}));

export default useStyles;
