import { describe, it, vi, expect, beforeEach } from 'vitest';
import { asyncGetLeaderboards, setLeaderboardsActionCreator } from './action';
import api from '@/utils/api';
import { Leaderboard } from '@/types/leaderboard';
import * as loadingBar from '@/utils/loading-bar-control';

/**
 * test scenarios for leaderboard actions
 *
 * - asyncGetLeaderboards thunk
 *  - should dispatch setLeaderboardsActionCreator and call loading bar functions when data fetching succeeds
 *
 */

describe('asyncGetLeaderboards thunk', () => {
  const fakeLeaderboards: Leaderboard[] = [
    {
      user: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      score: 10,
    },
    {
      user: {
        id: 'users-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      score: 5,
    },
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setLeaderboardsActionCreator and call loading bar functions when data fetching succeeds', async () => {
    api.getLeaderboards = vi.fn(() => Promise.resolve(fakeLeaderboards));
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    // Act
    await asyncGetLeaderboards()(dispatch);

    // Assert
    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      setLeaderboardsActionCreator(fakeLeaderboards)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});
