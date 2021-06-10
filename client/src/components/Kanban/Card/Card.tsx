import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Draggable } from 'react-beautiful-dnd';
import { ICard } from '../../../interface';
import { useKanban } from '../../../context/';
import useColorTagStyles from '../shared/colorStyles';
import useStyles from './useStyles';
import { number } from 'yup';

interface CardProps {
  index: number;
  card: ICard;
}

const Card = ({ index, card }: CardProps): JSX.Element => {
  const { setOpenCard } = useKanban();
  const classes = useStyles();
  const colorClasses = useColorTagStyles({ tag: card.tag });
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
            <Box
              onClick={() => {
                setOpenCard(card);
                return;
              }}
              className={clsx(classes.card, snapshot.isDragging && classes.cardDragging)}
            >
              <Box className={`${classes.cardTag} ${colorClasses.cardTagColor}`}></Box>
              <Typography className={classes.typography} variant="h6">
                {card.title}
              </Typography>
            </Box>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
