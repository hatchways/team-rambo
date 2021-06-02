import { Badge } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 10,
      top: 10,
      backgroundColor: theme.palette.tags.red,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
    },
  }),
)(Badge);
