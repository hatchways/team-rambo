import { useState } from 'react';
import {
  Button,
  IconButton,
  Box,
  Grid,
  Dialog,
  TextField,
  Typography,
  DialogActions,
  Snackbar,
} from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import addBoardDialogStyles from './AddBoardDialogStyles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import createBoard from '../../helpers/APICalls/createBoard';

interface Values {
  name: string;
}

interface IAlert {
  open: boolean;
  severity?: Color;
  message?: string;
}

const AddBoardDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = addBoardDialogStyles();
  const [alert, setOpenAlert] = useState<IAlert>({ open: false });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleAlertClose = async () => {
    setOpenAlert({ open: false });
  };

  const handleSubmit = async ({ name }: Values) => {
    const { error } = await createBoard(name);
    if (!error) {
      setOpenAlert({ open: true, message: 'Board created', severity: 'success' });
      return;
    }
    setOpenAlert({ open: true, message: 'Could not create board!', severity: 'error' });
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
    onSubmit: (values) => handleSubmit(values),
  });

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <Box>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          size="large"
          startIcon={<AddOutlinedIcon />}
          onClick={handleClickOpen}
          disableElevation
        >
          Create Board
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Typography variant="h5" className={classes.dialogTitle}>
          Create new board
        </Typography>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(values: Values) => console.log(values.name, 'sinal')}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(`Insert the board's name`).min(2).max(50),
          })}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} className={classes.formGrid}>
              <Grid item>
                <TextField
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  fullWidth
                  placeholder="Add Title"
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.inputs },
                  }}
                  className={classes.textField}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  className={classes.dialogButton}
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Formik>
        <DialogActions>
          <IconButton className={classes.topRight} onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddBoardDialog;
