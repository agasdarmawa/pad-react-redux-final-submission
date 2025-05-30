import { describe, it, expect } from 'vitest';
import usersReducer from './reducer'; // Adjust path accordingly
import { ActionType } from './action';
import { User } from '@/types/user';

/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 *  - should return the initial state when given undefined state
 *  - should handle RECEIVE_USERS action
 *  - should return current state for unknown action
 *
 */

describe('usersReducer function', () => {
  const mockSingleUser: User = {
    id: 'user-1',
    name: 'Alice',
    email: 'alice@example.com',
    avatar: 'https://example.com/alice.png',
  };

  const mockUsers: User[] = [
    {
      id: 'user-1',
      name: 'Alice',
      email: 'alice@example.com',
      avatar: 'https://example.com/alice.png',
    },
    {
      id: 'user-2',
      name: 'Bob',
      email: 'bob@example.com',
      avatar: 'https://example.com/bob.png',
    },
  ];

  it('should return the initial state when given undefined state', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = usersReducer(undefined, action);
    expect(nextState).toEqual([]);
  });

  it('should handle RECEIVE_USERS action', () => {
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users: mockUsers },
    };
    const nextState = usersReducer([], action);
    expect(nextState).toEqual(mockUsers);
  });

  it('should return current state for unknown action', () => {
    const prevState: User[] = [mockSingleUser];
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = usersReducer(prevState, action);
    expect(nextState).toEqual(prevState);
  });
});
