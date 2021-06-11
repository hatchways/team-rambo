import TextField from '@material-ui/core/TextField';
import datePickerStyles from './datePickerStyles';

interface PickerProps {
  content: string | string[];
  setContent: (newDate: string) => void;
}

export default function DatePicker({ content, setContent }: PickerProps): JSX.Element {
  const classes = datePickerStyles();

  const handleChange = () => {
    const input = document.getElementById('datetime-local');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setContent(input.value);
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={content || new Date(Date.now()).toISOString().slice(0, 16)}
        onChange={handleChange}
      />
    </form>
  );
}
