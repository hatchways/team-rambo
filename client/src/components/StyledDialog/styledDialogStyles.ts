import { makeStyles, Theme } from '@material-ui/core/styles';

const styledDialogStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textField: {
    display: 'flex',
    textAlign: 'center',
  },
  paper: {
    alignItems: 'center',
    padding: '40px 60px 20px 60px',
  },
  dialogTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputs: {
    height: '3rem',
    padding: '5px 60px',
    background: 'white',
    textAlign: 'center',
    borderRadius: '5px',
    boxShadow: '1px 1px 4px rgb(0,0,0,.3)',
    '&::placeholder': {
      color: 'black',
      fontWeight: 'bold',
      opacity: 1,
    },
  },
  formGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dialogContent: {
    height: 'auto',
    padding: 20,
  },
  component: {
    marginTop: 20,
  },
}));

export default styledDialogStyles;
