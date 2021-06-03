import Tour from 'reactour';
import { useTour } from '../../context';

export const TourGuide = (): JSX.Element => {
  const { isTourMode, tourSteps, tourModeEndHandler } = useTour();
  return <Tour isOpen={isTourMode} steps={tourSteps} onRequestClose={tourModeEndHandler} />;
};
