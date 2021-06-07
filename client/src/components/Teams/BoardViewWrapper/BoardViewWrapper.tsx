import { Grid } from '@material-ui/core';
import { PropsWithChildren } from 'react';

export const BoardViewWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element => (
  <Grid container>{children}</Grid>
);
