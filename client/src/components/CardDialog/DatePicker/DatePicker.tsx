import datePickerStyles from './datePickerStyles';
import TextField from '@material-ui/core/TextField';

export default function DatePicker(): JSX.Element {
  const classes = datePickerStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
