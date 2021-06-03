import { useContext, useState, createContext, PropsWithChildren, useEffect } from 'react';
import { ReactourStep } from 'reactour';
import ITourContext from '../interface/TourContext';

export const TourContext = createContext<ITourContext>({} as ITourContext);

interface TourProviderProps {
  steps: ReactourStep[];
}

export const TourProvider = ({ steps, children }: PropsWithChildren<TourProviderProps>): JSX.Element => {
  const [isTourMode, setIsTourMode] = useState<boolean>(true);
  const [hasSeenTour, setHasSeenTour] = useState<boolean>(false);
  const [tourSteps] = useState<ReactourStep[]>(steps || []);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setIsTourMode(true);
    }
  });

  const tourModeEndHandler = (): void => {
    localStorage.setItem('hasSeenTour', 'true');
    setIsTourMode(false);
    setHasSeenTour(true);
  };

  return (
    <TourContext.Provider
      value={{
        isTourMode,
        hasSeenTour,
        tourSteps,
        tourModeEndHandler,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error('useTour must be used within TourProvider');
  return ctx;
}
