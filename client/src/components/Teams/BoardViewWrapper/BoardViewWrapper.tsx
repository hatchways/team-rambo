import { Grid } from '@material-ui/core';
import { PropsWithChildren } from 'react';

export const BoardViewWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element => (
  <Grid lg={9} md={8} container>
    {children}
  </Grid>
);
