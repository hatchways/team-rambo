import { makeStyles } from '@material-ui/core/styles';

const addCardDialogStyles = makeStyles((theme) => ({
  textField: {
    display: 'flex',
    width: '100%',
    padding: '10px 0',
  },
  paper: {
    minWidth: '40%',
    minHeight: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'left',
    padding: '0px 10px 0 10px',
  },
  dialogTitle: {
    fontWeight: 'bold',
    padding: '15px 0 0 0',
  },
  dialogButton: { padding: '5px 20px' },
  smallDialogButton: { padding: '10px 10px' },
  buttonGroup: { paddingTop: '30px' },
  topRight: {
    position: 'absolute',
    left: '90%',
    top: '1%',
  },
  divider: {
    width: '100%',
  },
}));

export default addCardDialogStyles;
