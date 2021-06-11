import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  inviteText: {
    color: `darken(${theme.palette.teams.text}, 10%)`,
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
