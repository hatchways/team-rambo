import { Grid, Box } from '@material-ui/core';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { FocusCard } from './FocusCard/FocusCard';
import Column from './Column/Column';
import { IBoard } from '../../interface/';
import { useKanban } from '../../context/';
import { TourGuide } from '../TourGuide/TourGuide';

const Board = ({ activeBoard }: { activeBoard: IBoard }): JSX.Element => {
  const { handleDragEnd } = useKanban();

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <FocusCard />
        <Droppable droppableId="board" type="column" direction="horizontal">
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
      <TourGuide />
    </>
  );
};

export default Board;
