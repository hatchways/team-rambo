import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
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
