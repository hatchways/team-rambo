import { Dispatch, SetStateAction, useState } from 'react';
import { useTheme, Box, InputBase, Divider, Grid, Typography, Button } from '@material-ui/core';
import { Color } from '../Color/Color';
import { useKanban } from '../../../../context/useKanbanContext';
import useStyles from './useStyles';

type InnerFormProps = {
  columnId: string;
  formAction: Dispatch<SetStateAction<boolean>>;
};

// IMPORTANT TODO - Change this to a formik form instead (see login/signup forms) to keep consistent cross app
export const InnerForm = ({ columnId, formAction }: InnerFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>('');
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          addCard(title, selectedTagColor, columnId);
          formAction(false);
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
