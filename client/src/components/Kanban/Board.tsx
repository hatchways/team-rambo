import { Grid } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { useKanban } from '../../context/useKanbanContext';
import { FocusCard } from './FocusCard/FocusCard';
import Column from './Column/Column';

const Board = (): JSX.Element => {
  const { columns, handleDragEnd } = useKanban();
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <FocusCard />
      <Grid container>
        {columns.map((column) => (
          <Column key={column.id} id={column.id} name={column.name} cards={column.cards} />
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default Board;
