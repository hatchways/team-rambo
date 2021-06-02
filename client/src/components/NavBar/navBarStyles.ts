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
      padding: '2% 2%',
    },
    title: {
      flexGrow: 1,
      fontWeight: 'bold',
      fontSize: 24,
      paddingLeft: 5,
    },
  }),
);

export default useStyles;
