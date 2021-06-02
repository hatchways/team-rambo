import { Grid } from '@material-ui/core';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useKanban } from '../../context/useKanbanContext';
import { FocusCard } from './FocusCard/FocusCard';
import Column from './Column/Column';

const Board = (): JSX.Element => {
  const { focusedCard, columns, handleDragEnd } = useKanban();
  return (
    <>
      {focusedCard && <FocusCard />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="column" direction="horizontal">
          {(provided: DroppableProvided) => {
            return (
              <Grid ref={provided.innerRef} container spacing={2} {...provided.droppableProps}>
                {columns.map((column, index) => (
                  <>
                    <Column
                      key={column.id}
                      index={index}
                      id={column.id}
                      name={column.name}
                      cards={column.cards}
                      createdAt={column.createdAt}
                    />
                  </>
                ))}
                {provided.placeholder}
              </Grid>
            );
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
