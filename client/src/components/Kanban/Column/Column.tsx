import { Box, Grid, Typography } from '@material-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ICard, IColumn } from '../../../context/types/kanban';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import useStyles from './useStyles';

type ColumnProps = IColumn & { index: number };
const Column = ({ id, name, cards, index }: ColumnProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <Grid
            xs={12}
            md={6}
            lg="auto"
            item
            className={classes.columnGridItem}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Box className={classes.columnWrapper} {...provided.dragHandleProps}>
              <Box className={classes.typographyWrapper}>
                <Typography className={classes.typography} variant="h5">
                  {name}
                </Typography>
              </Box>
              <Droppable droppableId={id} type="card">
                {(provided) => {
                  return (
                    <Grid container {...provided.droppableProps} ref={provided.innerRef} direction="column">
                      {cards.map((card: ICard, index: number) => {
                        return (
                          <Card key={card.id} id={card.id} name={card.name} tag={card.tag || 'white'} index={index} />
                        );
                      })}
                      {provided.placeholder}
                      <CardForm columnId={id} />
                    </Grid>
                  );
                }}
              </Droppable>
            </Box>
          </Grid>
        );
      }}
    </Draggable>
  );
};

export default Column;
