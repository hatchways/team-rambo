import { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import StyledDialog from '../StyledDialog/StyledDialog';
import addBoardDialogStyles from './AddBoardDialogStyles';
import { useKanban, useSnackBar } from '../../context/';

interface Values {
  name: string;
}

const AddBoardDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = addBoardDialogStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { createNewBoard } = useKanban();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSubmit = async ({ name }: Values): Promise<void> => {
    const { board } = await createNewBoard(name);
    if (!board) updateSnackBarMessage('Could not create board!', 'error');
    updateSnackBarMessage(`Board "${board.name}" created`, 'success');
    handleClose();
    return;
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
    <>
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
      <StyledDialog
        open={open}
        buttonText="Create Board"
        title="Create New Board"
        toggleFunction={setOpen}
        buttonFunction={formik.handleSubmit}
        component={
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
              </Grid>
            </form>
          </Formik>
        }
      />
    </>
  );
};

export default AddBoardDialog;
