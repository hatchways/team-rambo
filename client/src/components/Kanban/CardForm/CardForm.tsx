import { Box, Button, Divider, InputBase, Grid, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useKanban } from '../../../context/useKanbanContext';
import { CardTagColors } from '../../../helpers/APICalls/kanban/colors';
import useStyles from './useStyles';

const CardForm = (): JSX.Element => {
  const classes = useStyles();
  const [formIsOpen, setFormIsOpen] = useState(false);

  const openForm = (): void => setFormIsOpen(true);
  const closeForm = (): void => setFormIsOpen(false);

  const handleClose = (event: globalThis.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeForm();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClose, false);
    return () => {
      document.removeEventListener('keydown', handleClose, false);
    };
  }, []);

  return (
    <Box>
      {formIsOpen ? <InnerForm /> : null}
      {!formIsOpen && (
        <Button
          onClick={openForm}
          size="large"
          color="primary"
          disableElevation
          className={`${!formIsOpen ? classes.button : ''}`}
        >
          Add a card...
        </Button>
      )}
    </Box>
  );
};

const InnerForm = () => {
  const [name, setName] = useState<string>('');
  const [selectedTagColor, setTagColor] = useState<string>('white');
  const { addCard } = useKanban();
  const classes = useStyles();

  return (
    <>
      <Box className={classes.cardFormWrapper}>
        <Box className={classes.cardForm}>
          <InputBase
            className={classes.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add title..."
          />
        </Box>
        <Divider light />
        <Box className={classes.tagWrapper}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography className={classes.typography} variant="body1">
                Select tag:
              </Typography>
            </Grid>
            <Grid item>
              <Grid container className={classes.colorsWrapper}>
                {Object.keys(CardTagColors).map((tagColor: string): JSX.Element => {
                  return (
                    <Color
                      key={CardTagColors[tagColor].hexCode}
                      name={tagColor}
                      hex={CardTagColors[tagColor].hexCode}
                      activeSelected={tagColor === selectedTagColor}
                      setSelected={setTagColor}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Button
        onClick={() =>
          addCard({
            name,
            columnId: 'col-id',
            id: 'card-id',
            tag: CardTagColors[selectedTagColor],
          })
        }
        variant="contained"
        size="large"
        color="primary"
        disableElevation
      >
        Add a card
      </Button>
    </>
  );
};

type ColorProps = {
  hex: string;
  activeSelected: boolean;
  setSelected: (name: string) => void;
  key?: string | number;
  name?: string;
};

const Color = ({ name = 'white', hex, activeSelected, setSelected }: ColorProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid
      onClick={() => setSelected(name)}
      style={{ backgroundColor: hex }}
      className={`${classes.color} ${activeSelected && classes.colorSelected}`}
      item
    ></Grid>
  );
};

export default CardForm;
