import { makeStyles, Theme } from '@material-ui/core/styles';

const styledDialogStyles = makeStyles((theme: Theme) => ({
  box: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
}));

export default styledDialogStyles;
