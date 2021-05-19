import { Box, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import { ICardTag } from '../../../context/types/kanban';
import { CardTagColors } from '../../../helpers/APICalls/kanban/colors';
import useStyles from './useStyles';

type CardProps = {
  id: string;
  name: string;
  index: number;
  tag: ICardTag | undefined;
};
const Card = ({ id, name, tag, index }: CardProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
            <Box className={`${classes.card} ${snapshot.isDragging && classes.cardDragging}`}>
              <Box
                style={{
                  backgroundColor: `${tag?.hexCode || CardTagColors.white.hexCode}`,
                }}
                className={classes.cardTag}
              ></Box>
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
