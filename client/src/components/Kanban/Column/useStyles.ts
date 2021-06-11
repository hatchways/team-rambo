import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: '1.285rem',
    fontWeight: 'bold',
  },
  typographyWrapper: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnWrapper: {
    padding: 16,
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 8,
  },
  inputBox: {
    width: '40%',
  },
  formGrid: {
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: '20px',
  },
  confirm: {
    backgroundColor: 'rgb(90, 205, 118)',
    '&:hover': {
      backgroundColor: 'rgb(70, 175, 98)',
    },
  },
  cancel: {
    backgroundColor: 'rgb(255, 93, 72)',
    '&:hover': {
      backgroundColor: 'rgb(225, 73, 52)',
    },
  },
  columnGridItem: {
    [theme.breakpoints.up('lg')]: {
      flex: 1,
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

export default useStyles;
