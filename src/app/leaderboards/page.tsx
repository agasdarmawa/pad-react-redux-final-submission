import { Metadata } from 'next';
import LeaderboardsWrapper from './LeaderboardsWrapper';

export const metadata: Metadata = {
  title: 'Leaderboards',
};

function LeaderboardsPage() {
  return <LeaderboardsWrapper />;
}

export default LeaderboardsPage;
