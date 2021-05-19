import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  typography: {
    fontWeight: 'bold',
  },
  typographyWrapper: {
    marginBottom: '20px',
  },
  columnWrapper: {
    padding: '1rem',
    backgroundColor: '#F4F6FF',
    marginRight: '20px',
    width: '380px',
    borderRadius: '8px',
  },
}));

export default useStyles;
