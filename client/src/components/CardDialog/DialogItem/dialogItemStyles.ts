import { makeStyles } from '@material-ui/core/styles';

const dialogItemStyles = makeStyles(() => ({
  textField: {
    display: 'flex',
    width: '100%',
    padding: '10px 0 10px 6.5%',
  },
  paper: {
    minWidth: '60%',
    minHeight: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  hasMargin: {
    padding: '0 30px',
  },
  titleContainer: {
    marginTop: '4%',
    alignItems: 'center',
  },
  mainSection: {
    padding: '20px 0',
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
  dialogButton: { padding: '5px 20px', margin: '0 0 0 6.5%' },
  columnButton: {
    backgroundColor: '#F4F6FF',
    color: '#9ba9cc',
    padding: '5px 0',
    margin: '2px 5px',
    border: 'none',
    width: '90px',
  },
  buttonContainer: { display: 'flex', alignItems: 'center', justify: 'flex-start', padding: '18px 0px 0 25px' },
  buttonGroup: { paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'left' },
  topRight: {
    position: 'absolute',
    left: '93%',
    top: '1%',
  },
  buttonColumnTitle: {
    color: '#9ba9cc',
    margin: '0 5px',
  },
  divider: {
    width: '100%',
  },
  icons: {
    marginRight: '2.5%',
    marginTop: '3px',
    display: 'inline',
    float: 'left',
  },
  cardTag: {
    width: 50,
    height: 8,
    borderRadius: 9999,
    marginLeft: '15px',
  },
}));

export default dialogItemStyles;
