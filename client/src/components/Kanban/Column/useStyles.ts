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
    backgroundColor: 'hsla(229, 100%, 96%, 1)',
    marginRight: '20px',
    width: '440px',
    borderRadius: '8px',
  },
}));

export default useStyles;
