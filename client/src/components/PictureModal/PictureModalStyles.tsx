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
  text: {
    fontWeight: 'bold',
  },
  dropZonePaper: {
    padding: 10,
    '&:hover': {
      background: '#CECECE',
    },
  },
  uploadIcon: {
    width: '100%',
    height: '100%',
    color: '#759CFC',
  },
}));

export default useStyles;
