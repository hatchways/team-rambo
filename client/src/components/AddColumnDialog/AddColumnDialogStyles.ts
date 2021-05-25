import { makeStyles } from '@material-ui/core/styles';

const addColumnDialogStyles = makeStyles((theme) => ({
  outerContainer: {
    width: '100%',
    pointerEvents: 'none',
  },
  textField: {
    display: 'flex',
    textAlign: 'center',
    width: '80%',
  },
  paper: {
    minWidth: '30%',
    minHeight: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 10px',
  },
  dialogTitle: {
    fontWeight: 'bold',
    paddingTop: '40px',
  },
  inputs: {
    height: '3rem',
    padding: '5px',
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
  buttonZone: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    pointerEvents: 'auto',
  },
  button: {
    opacity: 0,
    backgroundColor: '#666666',
    color: theme.palette.primary.contrastText,
    height: '90%',
    width: '90%',
    transition: 'opacity .5s',
    '&:hover': {
      opacity: '40%',
      backgroundColor: '#666666',
      color: theme.palette.primary.contrastText,
      height: '90%',
      width: '90%',
      transition: 'opacity .5s',
    },
  },
  dialogButton: { padding: '10px 30px' },
  topRight: {
    position: 'absolute',
    left: '85%',
    top: '2%',
  },
}));

export default addColumnDialogStyles;
