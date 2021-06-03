import { Box, Divider, Typography } from '@material-ui/core';
import { ReactourStep } from 'reactour';
import { stepStyles } from './stepStyles';

interface CardStepProps {
  heading: string;
  description: string;
}

const CardStep = ({ heading, description }: CardStepProps): JSX.Element => {
  const classes = stepStyles();

  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>
        {heading}
      </Typography>
      <Divider light className={classes.divider} />
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export const steps: ReactourStep[] = [
  {
    selector: '[data-tour="column-step"]',
    content: (
      <CardStep
        heading="Column"
        description="Columns help organize your cards to keep track of what needs to be done, what's happening and what's finished."
      />
    ),
  },
  {
    selector: '[data-tour="card-step"]',
    content: <CardStep heading="Card" description="These are tasks that you can assign yourself to do." />,
  },
  {
    selector: '[data-tour="card-form-step"]',
    content: <CardStep heading="Adding a card" description="Click here to add a new card to the column." />,
  },
  {
    selector: '[data-tour="add-board-step"]',
    content: (
      <CardStep heading="Creating a board" description="Creating a new board allows for further organization." />
    ),
  },
  {
    selector: '[data-tour="show-boards-step"]',
    content: (
      <CardStep heading="View all boards" description="View all your created boards and navigate through them here" />
    ),
  },
];
