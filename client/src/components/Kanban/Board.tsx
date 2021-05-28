import { Grid } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { IBoard } from '../../context/types/kanban';
import { useKanban } from '../../context/useKanbanContext';
import Column from './Column/Column';

const Board = ({ activeBoard }: { activeBoard: IBoard }): JSX.Element => {
  const { handleDragEnd } = useKanban();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container>
        {activeBoard.columns.map((column) => (
          <Column key={column._id} id={column._id} name={column.name} cards={column.cards} />
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default Board;
