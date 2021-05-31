import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  color: {
    cursor: 'pointer',
    width: 30,
    height: 30,
    border: '1px solid #EEEEEE',
    margin: theme.spacing(0, 0.5),
    borderRadius: 9999,
  },
  colorSelected: {
    outline: '2px solid #b0c5f5',
    outlineOffset: 2,
  },
}));

export default useStyles;
