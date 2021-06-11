import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    width: '100%',
  },
  flexDirection: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > div > div > h5': {
        alignSelf: 'self-start',
        padding: theme.spacing(2, 0),
      },
    },
  },
  appBarBtnGroup: {
    '& > button:nth-child(2)': {
      marginLeft: theme.spacing(3),
    },
  },
  appBarActionGroup: {
    flex: 1,
    '& > div > button': {
      marginRight: 8,
    },
    '& > div:last-child > button:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      margin: 4,
      '& > div:first-child': {
        flex: 1,
      },
      '& > div > button': {
        marginTop: 5,
      },
    },
  },
  appBarIconBtn: {
    marginLeft: theme.spacing(2),
  },
  dialogWrapper: {
    padding: theme.spacing(2),
  },
}));

export default useStyles;
