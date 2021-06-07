import { Dispatch, SetStateAction } from 'react';
import { Button, CircularProgress, Grid, Input } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useStyles from '../Kanban/Column/useStyles';
import { useKanban } from '../../context';

interface FormProps {
  id: string;
  name: string;
  setIsRenaming: Dispatch<SetStateAction<boolean>>;
}

const NameForm = ({ id, name, setIsRenaming }: FormProps): JSX.Element => {
  const classes = useStyles();
  const { updateBoardsName } = useKanban();

  const handleSubmit = async (
    { id, name }: { id: string; name: string },
    { setSubmitting }: FormikHelpers<{ id: string; name: string }>,
  ) => {
    await updateBoardsName(id, name, setSubmitting);
    setIsRenaming(false);
  };

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
          <Grid container className={classes.formGrid}>
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
            <Grid item>
              <Button type="submit" size="medium" variant="contained" color="primary" className={classes.confirm}>
                {isSubmitting ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Rename'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                className={classes.cancel}
                onClick={() => setIsRenaming((prev) => !prev)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default NameForm;
