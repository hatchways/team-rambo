import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: '100%',
      position: 'fixed',
      overflow: 'hidden',
      padding: '0',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    statusBar: {
      padding: '2% 2%',
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default useStyles;
