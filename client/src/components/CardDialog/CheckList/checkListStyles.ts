import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const checkListStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      marginLeft: theme.spacing(5.5),
      paddingBottom: theme.spacing(1),
      maxWidth: '95%',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

export default checkListStyles;
