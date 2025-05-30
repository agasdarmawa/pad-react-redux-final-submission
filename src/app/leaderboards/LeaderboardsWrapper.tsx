'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import { asyncGetLeaderboards } from '@/states/leaderboards/action';
import LeaderboardList from '@/components/leaderboards/LeaderboardListItem';

const LeaderboardsWrapper = () => {
  const leaderboards = useAppSelector((state) => state.leaderboards);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  if (!leaderboards) return <p>Loading...</p>;

  return (
    <>
      <section className="w-full mx-auto mt-20">
        <LeaderboardList leaderboards={leaderboards} />
      </section>
    </>
  );
};

export default LeaderboardsWrapper;
