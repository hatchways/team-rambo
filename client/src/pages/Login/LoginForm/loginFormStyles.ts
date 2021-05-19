import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  inputs: {
    height: '3rem',
    padding: '5px',
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
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
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
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
  },
}));

export default useStyles;
