import { Grid, TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useStyles from './splashScreenStyles';
import { useSnackBar, useKanban } from '../../context';

interface Values {
  name: string;
}

const SplashScreen = (): JSX.Element => {
  const classes = useStyles();
  const { createNewBoard, sendToFirstBoard } = useKanban();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = async ({ name }: Values): Promise<void> => {
    const { error } = await createNewBoard(name);

    if (error) {
      updateSnackBarMessage(error, 'error');

      return;
    }
    updateSnackBarMessage('Board created!');
    sendToFirstBoard();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Minimum of 3 characters length!')
        .max(50, 'Maximum of 50 characters length!')
        .required('Required field!'),
    }),
    onSubmit: (values: Values) => handleSubmit(values),
  });
  return (
    <Grid container direction="column" justify="center" spacing={3} className={classes.root}>
      <Grid item>
        <Typography variant="h4">{`It seems that you don't have any boards!`}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">{`Create a new one to enjoy our app!`}</Typography>
      </Grid>
      <Grid item>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                InputProps={{
                  classes: { input: classes.input },
                }}
                fullWidth
                name="name"
                placeholder="Board name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.name) && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="filled"
              />
            </Grid>
            <Grid item>
              <Button className={classes.submit} color="primary" variant="contained" fullWidth type="submit">
                {formik.isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : `Create board`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SplashScreen;
