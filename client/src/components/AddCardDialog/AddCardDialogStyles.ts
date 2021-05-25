import { makeStyles } from '@material-ui/core/styles';

const addCardDialogStyles = makeStyles((theme) => ({
  textField: {
    display: 'flex',
    width: '100%',
    padding: '10px 0 10px 6.5%',
  },
  paper: {
    minWidth: '50%',
    minHeight: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '10px 30px',
  },
  titleContainer: {
    marginTop: '4%',
  },
  dialogTitle: {
    fontWeight: 'bold',
    display: 'inline',
  },
  dialogSubTitle: {
    color: '#9ba9cc',
    margin: '2px 0 5px 6%',
  },
  dialogHeading: {
    display: 'inline',
    fontWeight: 'bold',
    marginTop: '4%',
  },
  date: {
    textDecoration: 'underline',
    marginLeft: '6.5%',
  },
  dialogButton: { padding: '5px 20px', margin: '0 0 0 6%' },
  columnButton: { backgroundColor: '#F4F6FF', color: '#9ba9cc', margin: '2px 5px', border: 'none', width: '90px' },
  buttonContainer: { display: 'flex', alignItems: 'center', justify: 'flex-start', padding: '0 0 0 10px' },
  buttonGroup: { paddingTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'left' },
  topRight: {
    position: 'absolute',
    left: '90%',
    top: '1%',
  },
  buttonColumnTitle: {
    color: '#9ba9cc',
    margin: '2px 0 5px 5px',
    textEmphasis: 'bold',
  },
  divider: {
    width: '100%',
  },
  icons: {
    marginRight: '2%',
    display: 'inline',
    float: 'left',
  },
}));

export default addCardDialogStyles;
