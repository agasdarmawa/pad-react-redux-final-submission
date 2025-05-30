import { describe, it, vi, expect, beforeEach } from 'vitest';
import api from '@/utils/api';
import * as loadingBar from '@/utils/loading-bar-control';
import {
  asyncPreloadProcess,
  setIsPreloadActionCreator,
  ActionType,
} from './action';
import { setAuthUserActionCreator } from '../authUser/action';

/**
 * test scenarios for preload actions
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch setAuthUserActionCreator with user data and call loading bar functions when fetching succeeds
 *  - should dispatch setAuthUserActionCreator with null and call loading bar functions when fetching fails
 *
 * - setIsPreloadActionCreator action creator
 *  - should create correct action object
 *
 */

describe('asyncPreloadProcess thunk', () => {
  const fakeUser = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setAuthUserActionCreator with user data and call loading bar functions when fetching succeeds', async () => {
    api.getOwnProfile = vi.fn(() => Promise.resolve(fakeUser));
    const dispatch = vi.fn();

    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncPreloadProcess()(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should dispatch setAuthUserActionCreator with null and call loading bar functions when fetching fails', async () => {
    api.getOwnProfile = vi.fn(() => Promise.reject(new Error('API error')));
    const dispatch = vi.fn();

    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncPreloadProcess()(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('setIsPreloadActionCreator', () => {
  it('should create correct action object', () => {
    const action = setIsPreloadActionCreator(true);
    expect(action).toEqual({
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: true,
      },
    });
  });
});
