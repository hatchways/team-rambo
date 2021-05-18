import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    minHeight: '100vh',
    paddingTop: 23,
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    alignContent: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  registerFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5vh',
  },
  divider: {
    width: '100%',
  },
  haveAccount: {
    marginTop: '30px',
    fontWeight: 'bold',
  },
  create: {
    fontWeight: 'bold',
    color: '#759CFC',
    cursor: 'pointer',
    width: 'fit-content',
  },
  submit: {
    color: 'blue',
  },
}));

export default useStyles;
