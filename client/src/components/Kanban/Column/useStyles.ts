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
    borderRadius: 8,
  },
  columnGridItem: {
    [theme.breakpoints.up('lg')]: {
      flex: 1,
    },
  },
}));

export default useStyles;
