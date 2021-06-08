import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    width: '100%',
  },
  appBarBtnGroup: {
    '& > button:nth-child(2)': {
      marginLeft: theme.spacing(3),
    },
  },
  appBarActionGroup: {
    flex: 1,
  },
  appBarIconBtn: {
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
