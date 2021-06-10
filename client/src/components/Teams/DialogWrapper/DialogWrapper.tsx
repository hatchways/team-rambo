import { Dialog, DialogTitle, IconButton, Typography, Grid, Theme, useMediaQuery, withStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { PropsWithChildren } from 'react';

export interface DialogWrapperProps {
  heading: string;
  open: boolean;
  onClose: () => void;
}

const Title = withStyles((theme: Theme) => ({
  root: {
    fontWeight: 900,
    color: theme.palette.teams.text,
  },
}))(DialogTitle);

export const DialogWrapper = ({
  heading,
  open,
  children,
  onClose,
}: PropsWithChildren<DialogWrapperProps>): JSX.Element => {
  const xsViewport = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  return (
    <Dialog onClose={onClose} open={open} fullWidth fullScreen={xsViewport}>
      <Title>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h4">{heading}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </Title>
      {children}
    </Dialog>
  );
};
