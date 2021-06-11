import { useState, MouseEvent } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ICard, IColumn } from '../../../interface/';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import GearButton from './GearButton';
import NameForm from './NameForm';
import ConfirmDelete from './ConfirmDelete';
import useStyles from './useStyles';

type ColumnProps = IColumn & { index: number };

const Column = ({ _id, name, cards, index }: ColumnProps): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const openConfirm = () => {
    setIsRenaming(false);
    closeMenu();
    setIsDeleting(true);
  };

  const closeConfirm = () => setIsDeleting(false);

  const toggleRenaming = (): void => {
    setIsRenaming((prev: boolean) => !prev);
    closeMenu();
  };

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
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
              {isRenaming ? (
                <NameForm id={_id} name={name} setIsRenaming={setIsRenaming} />
              ) : (
                <Typography className={classes.typography} variant="h5">
                  {name}
                </Typography>
              )}
              <GearButton
                anchorEl={anchorEl}
                openConfirm={openConfirm}
                openMenu={openMenu}
                closeMenu={closeMenu}
                toggleRenaming={toggleRenaming}
              />
            </Box>
            <ConfirmDelete id={_id} isDeleting={isDeleting} closeConfirm={closeConfirm} />
            <Droppable droppableId={_id} type="card">
              {(provided) => (
                <Grid container {...provided.droppableProps} ref={provided.innerRef} direction="column">
                  {cards.map((card: ICard, index: number) => (
                    <Card key={card._id} index={index} card={card} />
                  ))}
                  {provided.placeholder}
                  <CardForm columnId={_id} />
                </Grid>
              )}
            </Droppable>
          </Box>
        </Grid>
      )}
    </Draggable>
  );
};

export default Column;
