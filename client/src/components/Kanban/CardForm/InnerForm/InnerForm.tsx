import { Dispatch, SetStateAction, useState } from 'react';
import { useTheme, Box, InputBase, Divider, Grid, Typography, Button } from '@material-ui/core';
import { Color } from '../Color/Color';
import { useKanban } from '../../../../context/useKanbanContext';
import useStyles from './useStyles';

type InnerFormProps = {
  columnId: string;
  formAction: Dispatch<SetStateAction<boolean>>;
};

export const InnerForm = ({ columnId, formAction }: InnerFormProps): JSX.Element => {
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
                      key={`${columnId}-${tagColor}`}
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
      <Button
        onClick={() => {
          const isSuccess = addCard({
            name,
            columnId: columnId,
            id: `card-${Math.floor(Math.random() * 999999)}`,
            tag: selectedTagColor,
          });
          if (isSuccess) {
            formAction(false);
          }
        }}
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
