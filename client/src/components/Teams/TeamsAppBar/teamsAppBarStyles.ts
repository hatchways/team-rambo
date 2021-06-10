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
    '& > div:first-child > button:first-child': {
      marginRight: 8,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      margin: 4,
      '& > div:first-child': {
        flex: 1,
      },
    },
  },
  teamSwitcherButton: {
    fontWeight: 900,
    width: '100%',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  appBarIconBtn: {
    marginLeft: theme.spacing(2),
  },
  dialogWrapper: {
    padding: theme.spacing(2),
  },
  dialogTitle: {
    marginBottom: theme.spacing(3),
    fontWeight: 900,
    color: theme.palette.teams.text,
  },
  collaboratorsHeading: {
    marginBottom: theme.spacing(2),
  },
  collaborators: {
    '&:first-child': {
      marginLeft: 0,
    },
    '& > div': {
      marginLeft: 5,
      marginBottom: 8,
    },
  },
}));

export default useStyles;
