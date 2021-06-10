import { Grid, CircularProgress, Typography } from '@material-ui/core';
import useStyles from './loadingBoardStyles';

const LoadingBoard = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid spacing={4} container justify="center" className={classes.loadingScreen}>
      <Grid item>
        <CircularProgress size={150} />
      </Grid>
      <Grid item>
        <Typography variant="h4" className={classes.loadingScreenText}>
          Kanban
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoadingBoard;
