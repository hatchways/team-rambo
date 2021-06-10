import { Grid, Box } from '@material-ui/core';
import { ITeamBoard } from '../../../interface';
import { TeamBoard } from '../TeamBoard/TeamBoard';
import useStyles from './teamBoardViewStyles';

interface Props {
  boards: Array<ITeamBoard>;
}

export const TeamBoardView = ({ boards }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      {boards.map((board) => (
        <TeamBoard key={board._id} board={board} />
      ))}
    </Box>
  );
};
