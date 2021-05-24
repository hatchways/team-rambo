import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: '#FFFFFF',
    padding: '1.5rem',
    marginBottom: '15px',
    borderRadius: '5px',
    width: '100%',
    boxShadow: '0px 0px 10px rgba(193, 196, 212, .2)',
  },
  typography: {
    fontWeight: 'bold',
  },
  cardTag: {
    width: '50px',
    height: '8px',
    borderRadius: '9999px',
    marginBottom: '12px',
  },
  cardDragging: {
    transform: 'rotate(-5deg)',
    transition: 'transform 250ms ease',
    boxShadow: '0px 0px 50px rgba(193, 196, 212, 0.5)',
  },
}));

export default useStyles;
