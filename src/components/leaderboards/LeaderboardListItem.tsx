import { Leaderboard } from '@/types/leaderboard';
import LeaderboardsContentWrapper from './LeaderboardsContentWrapper';
import Image from 'next/image';

interface Props {
  leaderboards: Leaderboard[];
}

const LeaderboardList = ({ leaderboards }: Props) => {
  return (
    <LeaderboardsContentWrapper>
      {leaderboards.map((leaderboard, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <div className="flex items-center mb-2">
            <div className="min-w-[30px]">
              <h1 className="font-bold text-center">#{idx + 1}</h1>
            </div>
            <div className="flex items-center ml-5">
              <Image
                src={leaderboard.user.avatar}
                width={0}
                height={0}
                className="mr-2 rounded-full w-10 h-10"
                alt={leaderboard.user.name}
                unoptimized
              />
              <h2>{leaderboard.user.name}</h2>
            </div>
          </div>
          <h2>{leaderboard.score}</h2>
        </div>
      ))}
    </LeaderboardsContentWrapper>
  );
};

export default LeaderboardList;
