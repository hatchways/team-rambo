import { useState } from 'react';
import { Button, IconButton, Box, Grid, Dialog, TextField, Typography, DialogActions } from '@material-ui/core';
import addBoardDialogStyles from './AddBoardDialogStyles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import createBoard from '../../helpers/APICalls/createBoard';
import { IBoard } from '../../interface/Board';
import { useSnackBar } from '../../context/useSnackbarContext';

interface Props {
  onAddNewBoard: (board: IBoard) => void;
}

interface Values {
  name: string;
}

const AddBoardDialog = ({ onAddNewBoard }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = addBoardDialogStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSubmit = async ({ name }: Values) => {
    const { board, error } = await createBoard(name);
    if (!error) {
      updateSnackBarMessage('Board created', 'success');
      onAddNewBoard(board);
      handleClose();
      return;
    }
    updateSnackBarMessage('Could not create board!', 'error');
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
    </Box>
  );
};

export default AddBoardDialog;
