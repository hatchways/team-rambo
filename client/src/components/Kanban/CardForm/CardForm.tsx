import { Box, Button, Divider, InputBase, Grid, Typography, useTheme } from '@material-ui/core';
import { Dispatch } from 'react';
import { useState, useEffect, SetStateAction } from 'react';
import { useKanban } from '../../../context/useKanbanContext';
import AddCardDialog from '../../AddCardDialog/AddCardDialog';
import useColorTagStyles from '../shared/colorStyles';
import useStyles from './useStyles';

type CardFormProps = {
  columnId: string;
};

const CardForm = ({ columnId }: CardFormProps): JSX.Element => {
  const classes = useStyles();
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

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
      {formIsOpen ? <InnerForm columnId={columnId} formAction={setFormIsOpen} /> : null}
      {!formIsOpen && (
        <Button
          onClick={openForm}
          size="large"
          color="secondary"
          disableElevation
          className={`${!formIsOpen ? classes.button : ''}`}
        >
          Add a card...
        </Button>
      )}
    </Box>
  );
};

type InnerFormProps = {
  columnId: string;
  formAction: Dispatch<SetStateAction<boolean>>;
};
const InnerForm = ({ columnId, formAction }: InnerFormProps) => {
  const [name, setName] = useState<string>('');
  const [selectedTagColor, setTagColor] = useState<string>('white');
  const { addCard } = useKanban();
  const theme = useTheme();
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
                {Object.keys(theme.palette.tags).map((tagColor: string): JSX.Element => {
                  return (
                    <Color
                      key={tagColor}
                      name={tagColor}
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
      <AddCardDialog
        name={name}
        columnId={columnId}
        id={`card-${Math.floor(Math.random() * 999999)}`}
        tag={selectedTagColor}
      />
      {/* <Button
        onClick={() => {
          addCard({
            name,
            columnId: columnId,
            id: `card-${Math.floor(Math.random() * 999999)}`,
            tag: selectedTagColor,
          });
          formAction(false);
        }}
        variant="contained"
        size="large"
        color="primary"
        disableElevation
      >
        Add a card
      </Button> */}
    </>
  );
};

type ColorProps = {
  name: string;
  activeSelected: boolean;
  setSelected: (name: string) => void;
  key?: string | number;
};

const Color = ({ name = 'white', activeSelected, setSelected }: ColorProps): JSX.Element => {
  const classes = useStyles();
  const colorClasses = useColorTagStyles({ tag: name });
  return (
    <Grid
      onClick={() => setSelected(name)}
      className={`${classes.color} ${colorClasses.cardTagColor} ${activeSelected && classes.colorSelected}`}
      item
    ></Grid>
  );
};

export default CardForm;
