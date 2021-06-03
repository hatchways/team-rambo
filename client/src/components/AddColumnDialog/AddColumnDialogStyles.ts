import { makeStyles } from '@material-ui/core/styles';

const addColumnDialogStyles = makeStyles((theme) => ({
  outerContainer: {
    width: '100%',
    pointerEvents: 'none',
  },
  textField: {
    display: 'flex',
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
