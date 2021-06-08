import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: '0px 5px 13px rgba(0,0,0,0.09)',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
  },
  collaboratorInfo: {
    marginLeft: theme.spacing(2),
    '& > h6': {
      color: theme.palette.teams.text,
    },
    '& > p': {
      color: theme.palette.teams.subtext,
    },
  },
}));

export default useStyles;
