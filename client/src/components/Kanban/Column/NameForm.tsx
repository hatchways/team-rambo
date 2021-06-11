import { Dispatch, SetStateAction } from 'react';
import { Button, CircularProgress, Grid, Input } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import { useKanban } from '../../../context';

interface FormProps {
  id: string;
  name: string;
  setIsRenaming: Dispatch<SetStateAction<boolean>>;
}

const NameForm = ({ id, name, setIsRenaming }: FormProps): JSX.Element => {
  const classes = useStyles();
  const { renameColumn } = useKanban();

  const handleSubmit = (
    { name, id }: { name: string; id: string },
    { setSubmitting }: FormikHelpers<{ name: string; id: string }>,
  ) => renameColumn(id, name, setIsRenaming, setSubmitting);

  return (
    <Formik
      initialValues={{
        id,
        name,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container direction="column" spacing={1} className={classes.formGrid}>
            <Grid container xs={12}>
              <Grid item className={classes.inputBox}>
                <Input
                  id="name"
                  margin="dense"
                  name="name"
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  className={classes.typography}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" xs={12} justify="center" spacing={1} className={classes.buttonGrid}>
              <Grid item>
                <Button type="submit" variant="contained" color="primary" className={classes.confirm}>
                  {isSubmitting ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Rename'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.cancel}
                  onClick={() => setIsRenaming((prev) => !prev)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default NameForm;
