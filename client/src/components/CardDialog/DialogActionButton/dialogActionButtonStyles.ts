import { makeStyles, Theme } from '@material-ui/core/styles';

const dialogActionButtonStyles = makeStyles((theme: Theme) => ({
  columnButton: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    padding: '5px 0',
    margin: '2px 5px',
    border: 'none',
    width: '90px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  columnButtonActive: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '5px 0',
    margin: '2px 5px',
    border: 'none',
    width: '90px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main,
    },
  },
}));

export default dialogActionButtonStyles;
