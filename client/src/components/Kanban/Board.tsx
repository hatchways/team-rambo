import { Grid } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { useKanban } from '../../context/useKanbanContext';
import Column from './Column/Column';
import useStyles from './useStyles';

const Board = (): JSX.Element => {
  const classes = useStyles();
  const { columns, handleDragEnd } = useKanban();
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid className={classes.board} container>
        {columns.map((column) => (
          <Column key={column.id} id={column.id} name={column.name} cards={column.cards} />
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default Board;
