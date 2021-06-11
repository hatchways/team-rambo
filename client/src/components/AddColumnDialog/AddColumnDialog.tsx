import { useState } from 'react';
import { Button, TextField, Grid, Box } from '@material-ui/core';
import { useKanban } from '../../context';
import addColumnDialogStyles from './AddColumnDialogStyles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import StyledDialog from '../StyledDialog/StyledDialog';

const AddColumnDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState('right');
  const [columnName, setColumnName] = useState('');
  const classes = addColumnDialogStyles();
  const { addColumn } = useKanban();

  const handleClickOpen = (addToSide: string) => {
    setOpen(true);
    setSide(addToSide);
  };

  const handleSubmit = (): void => {
    const board = addColumn(side, columnName);

    if (!board) return;

    setOpen(false);
  };

  return (
    <Box className={classes.outerContainer}>
      <Grid container direction="row" alignItems="stretch" justify="space-between">
        <Grid item xs={1} className={classes.buttonZone}>
          <Button className={classes.button} onClick={() => handleClickOpen('left')}>
            {<AddCircleOutlineOutlinedIcon fontSize="large" />}
          </Button>
        </Grid>
        <Grid item xs={1} className={classes.buttonZone}>
          <Button className={classes.button} onClick={() => handleClickOpen('right')}>
            {<AddCircleOutlineOutlinedIcon fontSize="large" />}
          </Button>
        </Grid>
      </Grid>
      <StyledDialog
        open={open}
        buttonText="Create"
        title="Create a new column"
        toggleFunction={() => {
          setOpen(false);
        }}
        buttonFunction={handleSubmit}
        component={
          <TextField
            required
            fullWidth
            placeholder="Add Title"
            variant="outlined"
            onChange={(e) => setColumnName(e.target.value)}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            className={classes.textField}
          />
        }
      />
    </Box>
  );
};

export default AddColumnDialog;
