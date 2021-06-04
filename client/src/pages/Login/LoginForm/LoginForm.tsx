import { Button, Box, CircularProgress, TextField } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useStyles from './loginFormStyles';
import { login } from '../../../helpers/';
import { useAuth, useKanban, useSnackBar } from '../../../context/';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function Login({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { sendToFirstBoard } = useKanban();
  const { updateSnackBarMessage } = useSnackBar();

  const demoUser = () => {
    login('demo@user.ca', 'demouser').then((data) => {
      if (data.success) {
        updateLoginContext(data.success);
        sendToFirstBoard();
      } else {
        updateSnackBarMessage('Could not login', 'error');
      }
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="email"
            fullWidth
            placeholder="Enter email"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="email"
            autoComplete="email"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
            variant="filled"
          />
          <TextField
            id="password"
            fullWidth
            placeholder="Enter Password"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
          />
          <Box textAlign="center" className={classes.buttonBox}>
            <Button type="submit" size="large" variant="contained" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Login'}
            </Button>
            <Button size="large" variant="contained" className={classes.submit} onClick={demoUser}>
              Demo
            </Button>
          </Box>
          <div style={{ height: 95 }} />
        </form>
      )}
    </Formik>
  );
}
