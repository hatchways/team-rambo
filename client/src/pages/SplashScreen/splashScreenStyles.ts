import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(10),
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    height: '3rem',
    padding: 5,
    background: 'white',
    textAlign: 'center',
    borderRadius: 5,
    boxShadow: '1px 1px 4px rgb(0,0,0,.3)',
    '&::placeholder': {
      color: 'black',
      fontWeight: 'bold',
      opacity: 1,
    },
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    backgroundColor: '#759CFC',
    color: 'white',
    fontWeight: 'bold',
  },
}));

export default useStyles;
