import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    '& > div > div': {
      marginBottom: theme.spacing(3),
    },
  },
}));

export default useStyles;
