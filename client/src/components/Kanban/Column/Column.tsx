import { Box, Grid, Typography } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import { ICard } from '../../../interface/Card';
import { IColumn } from '../../../interface/Column';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import useStyles from './useStyles';

type ColumnProps = IColumn;
const Column = ({ id, name, cards }: ColumnProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid xs={12} md={6} lg="auto" item className={classes.columnGridItem}>
      <Box className={classes.columnWrapper}>
        <Box className={classes.typographyWrapper}>
          <Typography className={classes.typography} variant="h5">
            {name}
          </Typography>
        </Box>
        <Droppable droppableId={id}>
          {(provided) => {
            return (
              <Grid container {...provided.droppableProps} ref={provided.innerRef} direction="column">
                {cards.map((card: ICard, index: number) => {
                  return (
                    <Card
                      key={card.id}
                      id={card.id}
                      columnId={card.columnId}
                      name={card.name}
                      tag={card.tag || 'white'}
                      index={index}
                    />
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
};

export default Column;
