import { ReactourStep } from 'reactour';

export default interface ITourContext {
  isTourMode: boolean;
  hasSeenTour: boolean;
  tourSteps: ReactourStep[];
  tourModeEndHandler: () => void;
}
