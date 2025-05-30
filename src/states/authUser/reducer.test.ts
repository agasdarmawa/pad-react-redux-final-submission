import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';
import { User } from '@/types/user';

/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the authUser when receiving SET_AUTH_USER action
 *   - should return null when receiving UNSET_AUTH_USER action
 *   - should return the current state when receiving unknown action
 */

describe('authUserReducer function', () => {
  const fakeUser: User = {
    id: 'user-1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://example.com/avatar.png',
  };

  it('should return the authUser when receiving SET_AUTH_USER action', () => {
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUser },
    };

    const nextState = authUserReducer(null, action);
    expect(nextState).toEqual(fakeUser);
  });

  it('should return null when receiving UNSET_AUTH_USER action', () => {
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    };

    const nextState = authUserReducer(fakeUser, action);
    expect(nextState).toBeNull();
  });

  it('should return the current state when receiving unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const currentState = fakeUser;

    const nextState = authUserReducer(currentState, unknownAction);
    expect(nextState).toEqual(currentState);
  });
});
