import { Box, TextField } from '@material-ui/core';
import * as yup from 'yup';
import { CREATE_TEAM_BOARD } from '../../../actions/team';
import { useTeam } from '../../../context/useTeams';
import request from '../../../helpers/APICalls/teams/request';
import { createTeamBoard } from '../../../helpers/APICalls/teams/requests';
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
  const { state, dispatch } = useTeam();
  const classes = useStyles();
  return (
    <DialogForm<TeamForm>
      initialValues={{ name: '', description: '' }}
      validation={teamValidation}
      onSubmit={async (values) => {
        const response = await request(createTeamBoard(state.activeTeam._id, values));
        dispatch({
          type: CREATE_TEAM_BOARD,
          payload: response.payload,
        });
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
        </Box>
      )}
    </DialogForm>
  );
};
