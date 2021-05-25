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
  button: {
    fontWeight: 'bold',
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
  color: {
    cursor: 'pointer',
    width: 30,
    height: 30,
    border: '1px solid #EEEEEE',
    margin: theme.spacing(0, 0.5),
    borderRadius: 9999,
  },
  colorSelected: {
    outline: '2px solid #b0c5f5',
    outlineOffset: 2,
  },
}));

export default useStyles;
