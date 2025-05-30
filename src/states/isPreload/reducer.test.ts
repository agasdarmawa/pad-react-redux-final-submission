import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

/**
 * test scenarios for isPreloadReducer
 *
 * - should return initial state when given unknown action
 * - should handle SET_IS_PRELOAD action and update state correctly
 */

describe('isPreloadReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = true;

    const newState = isPreloadReducer(initialState, { type: 'UNKNOWN_ACTION' });

    expect(newState).toBe(initialState);
  });

  it('should handle SET_IS_PRELOAD action and update state to true', () => {
    const initialState = false;

    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: true,
      },
    };

    const newState = isPreloadReducer(initialState, action);

    expect(newState).toBe(true);
  });

  it('should handle SET_IS_PRELOAD action and update state to false', () => {
    const initialState = true;

    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    const newState = isPreloadReducer(initialState, action);

    expect(newState).toBe(false);
  });

  it('should return current state if action payload is malformed', () => {
    const initialState = true;

    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: 'not-a-boolean',
      },
    };

    const newState = isPreloadReducer(initialState, action);

    expect(newState).toBe(initialState);
  });

  it('should return initial state if action is not an object', () => {
    const initialState = true;

    const newState = isPreloadReducer(initialState, null);

    expect(newState).toBe(initialState);
  });
});
