import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardForm: {
    padding: theme.spacing(2, 2),
    width: '100%',
  },
  cardFormWrapper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 0px 10px rgba(193, 196, 212, .2)',
    borderRadius: 5,
    border: `2px solid ${theme.palette.primary.main}`,
    marginBottom: 12,
  },
  tagWrapper: {
    padding: theme.spacing(2, 2),
  },
  input: {
    width: '100%',
    fontWeight: 'bold',
  },
  colorsWrapper: {
    listStyle: 'none',
  },
  typography: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
}));

export default useStyles;
