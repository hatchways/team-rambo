import { Button, useTheme } from '@material-ui/core';
import Tour from 'reactour';
import { useTour } from '../../context';

export const TourGuide = (): JSX.Element => {
  const theme = useTheme();
  const { isTourMode, tourSteps, tourModeEndHandler } = useTour();
  return (
    <Tour
      accentColor={theme.palette.primary.main}
      isOpen={isTourMode}
      steps={tourSteps}
      onRequestClose={tourModeEndHandler}
      onAfterOpen={(_) => (document.body.style.overflowY = 'hidden')}
      rounded={5}
      maskSpace={12}
      disableInteraction
      closeWithMask={false}
      lastStepNextButton={
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      }
    />
  );
};
