import { Button, DialogActions } from '@material-ui/core';
import { FormikErrors, FormikTouched, FormikValues, useFormik } from 'formik';
import { ChangeEvent } from 'react';
import { OptionalObjectSchema } from 'yup/lib/object';
import useStyles from './dialogFormStyles';

interface DialogFormProps<T> {
  initialValues: T;
  validation: OptionalObjectSchema<Record<string, any>>;
  onSubmit: (values: T) => void;
  children: (state: {
    errors: FormikErrors<T>;
    values: FormikValues;
    touched: FormikTouched<T>;
    handleChange: (e: ChangeEvent<Element>) => void;
  }) => JSX.Element;
}

export const DialogForm = <T,>({ initialValues, validation, onSubmit, children }: DialogFormProps<T>) => {
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: (values: T) => onSubmit(values),
  });
  const classes = useStyles();

  formik.handleChange;

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      {children({
        errors: formik.errors,
        values: formik.values,
        touched: formik.touched,
        handleChange: formik.handleChange,
      })}
      <DialogActions>
        <Button color="primary" variant="contained" fullWidth type="submit" size="large">
          Create
        </Button>
      </DialogActions>
    </form>
  );
};
