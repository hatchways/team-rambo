import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  dropZonePaper: {
    height: 'fit-content',
    padding: 10,
    cursor: 'pointer',
    '&:hover': {
      background: '#CECECE',
    },
  },
  uploadIcon: {
    width: '100%',
    height: '4em',
    color: '#759CFC',
  },
  avatarBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
  },
  dialogContent: {
    height: 'auto',
    padding: 20,
  },
}));

export default useStyles;
