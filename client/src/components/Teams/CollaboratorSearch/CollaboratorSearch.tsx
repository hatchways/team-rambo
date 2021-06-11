import { Box, TextField } from '@material-ui/core';
import * as yup from 'yup';
import { useSnackBar } from '../../../context';
import { useTeam } from '../../../context/useTeams';
import request from '../../../helpers/APICalls/teams/request';
import { searchUsers, inviteUser } from '../../../helpers/APICalls/teams/requests';
import { DialogForm } from '../DialogForm/DialogForm';
interface CollaboratorSearchForm {
  email: string;
}

const collaboratorValidation = yup.object({
  email: yup.string().email().required('Please enter an email'),
});

export const CollaboratorSearch = (): JSX.Element => {
  const { state } = useTeam();
  const { updateSnackBarMessage } = useSnackBar();
  return (
    <DialogForm<CollaboratorSearchForm>
      initialValues={{ email: '' }}
      validation={collaboratorValidation}
      onSubmit={async (values) => {
        const response = await request(searchUsers(values.email));
        if (response.users.length === 0) {
          updateSnackBarMessage('No user found with that email', 'error');
        }
        const invite = await request(inviteUser(state.activeTeam._id, response.users[0]._id));
        if (invite.error) {
          updateSnackBarMessage(invite.error, 'error');
        }
      }}
    >
      {(formik) => (
        <Box>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
            required
          />
        </Box>
      )}
    </DialogForm>
  );
};
