import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardForm: {
    padding: '1rem 01.5rem',
    width: '100%',
  },
  cardFormWrapper: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 10px rgba(193, 196, 212, .2)',
    borderRadius: '5px',
    border: '2px solid #759CFC',
    marginBottom: '12px',
  },
  button: {
    color: '#9BA9CC',
    fontWeight: 'bold',
  },
  tagWrapper: {
    padding: '1rem 1.5rem',
  },
  input: {
    width: '100%',
    fontWeight: 'bold',
  },
  colorsWrapper: {
    listStyle: 'none',
  },
  typography: {
    color: '#BCC6DD',
    fontWeight: 'bold',
  },
  color: {
    cursor: 'pointer',
    width: '25px',
    height: '25px',
    border: '1px solid #EEEEEE',
    margin: '0 5px',
    borderRadius: '9999px',
  },
  colorSelected: {
    outline: '2px solid #b0c5f5',
    outlineOffset: '1px',
  },
}));

export default useStyles;
