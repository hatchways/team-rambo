import { Grid } from '@material-ui/core';
import { ITeamBoard } from '../../../interface';
import { TeamBoard } from '../TeamBoard/TeamBoard';
import useStyles from './teamBoardViewStyles';

interface Props {
  boards: Array<ITeamBoard>;
}

export const TeamBoardView = ({ boards }: Props): JSX.Element => {
  return (
    <Grid container spacing={2}>
      {boards.map((board) => (
        <Grid item key={board._id}>
          <TeamBoard board={board} />
        </Grid>
      ))}
    </Grid>
  );
};
