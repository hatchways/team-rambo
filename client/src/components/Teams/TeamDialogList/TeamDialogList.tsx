import { List, ListItemAvatar, ListItem, ListItemText, Avatar, withStyles, Theme } from '@material-ui/core';
import { SET_ACTIVE_TEAM } from '../../../actions/team';
import { useTeam } from '../../../context/useTeams';
import request from '../../../helpers/APICalls/teams/request';
import { getTeam } from '../../../helpers/APICalls/teams/requests';
import { ITeam } from '../../../interface';

const PurpleAvatar = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
}))(Avatar);

interface TeamDialogListProps {
  close: () => void;
}

export const TeamDialogList = ({ close }: TeamDialogListProps): JSX.Element => {
  const { state, dispatch } = useTeam();

  const setActiveTeam = async (team: ITeam) => {
    const response = await request(getTeam(team._id));
    dispatch({
      type: SET_ACTIVE_TEAM,
      payload: response,
    });
    close();
  };

  return (
    <List>
      {state.teams.map((team: ITeam) => (
        <ListItem
          key={team._id}
          onClick={() => setActiveTeam(team)}
          selected={team._id === state.activeTeam._id || false}
          button
        >
          <ListItemAvatar>
            <PurpleAvatar>{team.name.split('')[0].toUpperCase()}</PurpleAvatar>
          </ListItemAvatar>
          <ListItemText primary={team.name} />
        </ListItem>
      ))}
    </List>
  );
};
