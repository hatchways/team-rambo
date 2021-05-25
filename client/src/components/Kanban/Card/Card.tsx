import { Box, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import useColorTagStyles from '../shared/colorStyles';
import useStyles from './useStyles';

type CardProps = {
  id: string;
  name: string;
  index: number;
  tag: string;
};
const Card = ({ id, name, tag = 'white', index }: CardProps): JSX.Element => {
  const classes = useStyles();
  const colorClasses = useColorTagStyles({ tag });
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
            <Box className={`${classes.card} ${snapshot.isDragging && classes.cardDragging}`}>
              <Box className={`${classes.cardTag} ${colorClasses.cardTagColor}`}></Box>
              <Typography className={classes.typography} variant="h6">
                {name}
              </Typography>
            </Box>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
