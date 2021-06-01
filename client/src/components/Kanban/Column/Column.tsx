import { useState, MouseEvent } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import { ICard } from '../../../interface/';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import GearButton from './GearButton';
import NameForm from './NameForm';
import ConfirmDelete from './ConfirmDelete';
import useStyles from './useStyles';

interface ColumnProps {
  id: string;
  name: string;
  cards: ICard[];
  createdAt?: Date;
}

const Column = ({ id, name, cards }: ColumnProps): JSX.Element => {
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
    <Grid item>
      <Box className={classes.columnWrapper}>
        <Box>
          <Box className={classes.typographyWrapper}>
            {isRenaming ? (
              <NameForm id={id} name={name} setIsRenaming={setIsRenaming} />
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
          <ConfirmDelete id={id} isDeleting={isDeleting} closeConfirm={closeConfirm} />
        </Box>
        <Droppable droppableId={id}>
          {(provided) => {
            return (
              <Grid container {...provided.droppableProps} ref={provided.innerRef} direction="column">
                {cards.map((card: ICard, index: number) => {
                  return (
                    <Card
                      key={card._id}
                      id={card._id}
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
