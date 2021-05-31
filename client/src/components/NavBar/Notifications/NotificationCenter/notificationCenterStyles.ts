import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const notificationCenterStyles = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 10,
      top: 10,
      backgroundColor: theme.palette.tags.red,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
    },
  }),
);

export default notificationCenterStyles;
