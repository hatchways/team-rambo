import { makeStyles } from '@material-ui/core/styles';

const styledDialogStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
}));

export default styledDialogStyles;
