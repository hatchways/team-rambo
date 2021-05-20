import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    display: 'flex',
    textAlign: 'center',
  },
  dialog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonZone: {
    height: '500px',
    width: '50px',
  },
  button: {
    opacity: 0,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    height: '90%',
    width: '90%',
    transition: 'opacity .5s',
    '&:hover': {
      opacity: 75,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      height: '90%',
      width: '90%',
      transition: 'opacity .5s',
    },
  },
  dialogButton: {},
}));

export default useStyles;
