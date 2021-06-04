import { makeStyles } from '@material-ui/core/styles';

const styledDialogStyles = makeStyles(() => ({
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
    marginBottom: '40px',
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
  dialogButton: { padding: '8px 30px', marginTop: '30px' },
  topRight: {
    position: 'absolute',
    left: '85%',
    top: '2%',
  },
  formGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default styledDialogStyles;
