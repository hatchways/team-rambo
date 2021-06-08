import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    medium: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      cursor: 'pointer',
    },
    listItemIcon: {
      minWidth: 38,
    },
    listItemText: {
      color: theme.palette.primary.main,
      fontWeight: 'bolder',
    },
  }),
);

export default useStyles;
