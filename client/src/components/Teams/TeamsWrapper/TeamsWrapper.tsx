import { TeamProvider } from '../../../context/useTeams';
import TeamsDashboard from '../../../pages/Teams/Teams';

export const TeamsWrapper = () => (
  <TeamProvider>
    <TeamsDashboard />
  </TeamProvider>
);
