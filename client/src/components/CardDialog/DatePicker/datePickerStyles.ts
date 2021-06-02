import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const datePickerStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(5.5),
      paddingBottom: theme.spacing(1),
      width: 200,
    },
  }),
);

export default datePickerStyles;
