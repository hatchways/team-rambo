import { makeStyles } from '@material-ui/core/styles';
import signUpPageImage from '../../Images/signUpPageImage.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: 23,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
  image: {
    backgroundImage: `url(${signUpPageImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  haveAccount: {
    marginTop: 30,
    fontWeight: 'bold',
  },
  login: {
    fontWeight: 'bold',
    color: '#759CFC',
    cursor: 'pointer',
    width: 'fit-content',
  },
  divider: {
    width: '100%',
  },
  loginFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5vh',
    textAlign: 'center',
    alignContent: 'center',
    width: '100%',
  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '80vh',
    width: '100%',
  },
}));

export default useStyles;
