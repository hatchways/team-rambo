import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: '100%',
      overflow: 'hidden',
      padding: '0',
      backgroundColor: '#FFFFFF',
    },
    viewBoardsButton: {
      marginRight: 12,
      color: 'white',
    },
    statusBar: {
      padding: '10px 20px 10px 20px',
      minHeight: 100,
    },
    title: {
      flexGrow: 1,
      fontWeight: 'normal',
      fontSize: 20,
      paddingLeft: 5,
    },
    navBarButtons: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    menuIcon: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    secondNotification: {
      justify: 'flex-end',
      alignItems: 'flex-end',

      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
  }),
);

export default useStyles;
