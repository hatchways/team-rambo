import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const notificationStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(2),
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    title: {
      color: theme.palette.primary.main,
      display: 'inline',
    },
    divider: {
      width: '100%',
      marginBottom: theme.spacing(1),
    },
    icons: {
      marginRight: '2.5%',
      marginTop: '3px',
      display: 'inline',
      float: 'left',
      color: theme.palette.primary.main,
    },
    indent: {
      paddingLeft: '7%',
    },
    read: {
      '& *': { color: theme.palette.secondary.main },
    },
    linkText: {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
    ignoreRead: {
      '& *': { color: 'unset' },
    },
    dismiss: {
      display: 'inline',
      float: 'right',
      padding: '0',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText },
      '&:disabled': {
        opacity: 0,
      },
    },
  }),
);

export default notificationStyles;
