import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';
import { Leaderboard } from '@/types/leaderboard';

/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given undefined state
 *  - should handle SET_LEADERBOARDS action
 *  - should return current state for unknown action
 *
 */

describe('leaderboardsReducer function', () => {
  const mockSingleLeaderboard: Leaderboard = {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  };

  const mockLeaderboards: Leaderboard[] = [
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

  it('should return the initial state when given undefined state', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const result = leaderboardsReducer(undefined, action);
    expect(result).toEqual([]);
  });

  it('should handle SET_LEADERBOARDS action', () => {
    const action = {
      type: ActionType.SET_LEADERBOARDS,
      payload: { leaderboards: mockLeaderboards },
    };
    const result = leaderboardsReducer([], action);
    expect(result).toEqual(mockLeaderboards);
  });

  it('should return current state for unknown action', () => {
    const prevState: Leaderboard[] = [mockSingleLeaderboard];
    const action = { type: 'UNKNOWN_ACTION' };
    const result = leaderboardsReducer(prevState, action);
    expect(result).toEqual(prevState);
  });
});
