import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    fontWeight: 'bold',
  },
  typographyWrapper: {
    marginBottom: 20,
  },
  columnWrapper: {
    padding: 16,
    backgroundColor: theme.palette.secondary.light,
    marginRight: 20,
    width: 440,
    borderRadius: 8,
  },
}));

export default useStyles;
