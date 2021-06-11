import { Grid } from '@material-ui/core';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { FocusCard } from './FocusCard/FocusCard';
import Column from './Column/Column';
import { IBoard } from '../../interface/';
import { useKanban } from '../../context/';

const Board = ({ activeBoard }: { activeBoard: IBoard }): JSX.Element | null => {
  const { focusedCard, handleDragEnd } = useKanban();

  if (!activeBoard) return null;

  return (
    <>
      {focusedCard.title && <FocusCard />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={activeBoard && activeBoard._id} type="column" direction="horizontal">
          {(provided: DroppableProvided) => (
            <Grid ref={provided.innerRef} container spacing={2} {...provided.droppableProps}>
              {activeBoard.columns.map((column, index) => (
                <Column
                  key={column._id}
                  index={index}
                  _id={column._id}
                  name={column.name}
                  cards={column.cards}
                  createdAt={column.createdAt}
                />
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
