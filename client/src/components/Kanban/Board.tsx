import { Grid } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { IBoard } from '../../interface/';
import { useKanban } from '../../context/';
import { FocusCard } from './FocusCard/FocusCard';
import Column from './Column/Column';

const Board = ({ activeBoard }: { activeBoard: IBoard }): JSX.Element => {
  const { handleDragEnd } = useKanban();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <FocusCard />
      <Grid container>
        {activeBoard.columns.map((column) => (
          <Column key={column._id} id={column._id} name={column.name} cards={column.cards} />
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default Board;
