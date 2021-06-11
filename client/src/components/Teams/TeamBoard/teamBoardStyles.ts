import { makeStyles, Theme } from '@material-ui/core/styles';

const styledDialogStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 300,
    height: 'fit-content',
    borderStyle: 'solid',
    borderWidth: 0.6,
    borderColor: 'rgb(0,0,0,0)',
    boxShadow: '1px 1px 4px rgb(0,0,0,0.2)',
    borderRadius: 10,
    margin: 5,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  },
  header: {
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
  },
  content: {
    color: '#6d7c91',
    paddingTop: 0,
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  date: {
    color: '#c4c8d0',
  },
  cannotModify: {
    opacity: 0.1,
  },
}));

export default styledDialogStyles;
