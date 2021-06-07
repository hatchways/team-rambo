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
    menuButton: {
      marginRight: 12,
    },
    statusBar: {
      padding: '10px 20px 10px 20px',
      minHeight: 100,
    },
    title: {
      flexGrow: 1,
      fontWeight: 'bold',
      fontSize: 24,
      paddingLeft: 5,
    },
    navBarButtons: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }),
);

export default useStyles;
