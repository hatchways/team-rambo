import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  sidebar: {
    backgroundColor: theme.palette.teams.secondary,
    flex: 1,
  },
  teamSwitcherWrapper: {
    marginTop: theme.spacing(2),
  },
  teamSwitcherButton: {
    fontWeight: 900,
    width: '100%',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  collaboratorsWrapper: {
    marginTop: theme.spacing(5),
    color: theme.palette.teams.text,
  },
  collaboratorList: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
