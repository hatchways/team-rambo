import { Box, TextField, Chip, Avatar, Grid, Typography, Button } from '@material-ui/core';
import * as yup from 'yup';
import { DialogForm } from '../DialogForm/DialogForm';
import useStyles from './teamBoardFormStyle';

interface TeamForm {
  name: string;
  description: string;
}

const teamValidation = yup.object({
  name: yup.string().required('Please enter a board name'),
  description: yup.string(),
});

export const TeamBoardForm = (): JSX.Element => {
  const classes = useStyles();
  return (
    <DialogForm<TeamForm>
      initialValues={{ name: '', description: '' }}
      validation={teamValidation}
      onSubmit={(values) => {
        // TODO: this will dispatch the CREATE_TEAM_BOARD action
        console.log(values);
      }}
    >
      {(formik) => (
        <Box>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Board name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            autoFocus
            required
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            type="text"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            rows={4}
            multiline
          />
          <Box>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" className={classes.collaboratorsHeading}>
                  Select collaborators to add.
                </Typography>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" size="small">
                  Add everyone
                </Button>
              </Grid>
            </Grid>
            <Box className={classes.collaborators}>
              <Chip avatar={<Avatar>E</Avatar>} label="Ethan Moffat" />
              <Chip avatar={<Avatar>A</Avatar>} label="Ahmed" />
              <Chip avatar={<Avatar>J</Avatar>} label="Jon Myers" />
              <Chip avatar={<Avatar>G</Avatar>} label="Gabriel" />
            </Box>
          </Box>
        </Box>
      )}
    </DialogForm>
  );
};
