import { describe, it, vi, expect, beforeEach } from 'vitest';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  getAuthTokenUser,
} from './action';
import api from '@/utils/api';
import { User } from '@/types/user';

/**
 * test scenario for auth actions
 *
 * - asyncSetAuthUser
 *   - should dispatch setAuthUserActionCreator with user after login success
 *   - should throw error and not dispatch if login fails
 *
 * - asyncUnsetAuthUser
 *   - should dispatch unsetAuthUserActionCreator and clear token
 *
 * - getAuthTokenUser
 *   - should dispatch setAuthTokenUserActionCreator with token
 */

describe('asyncSetAuthUser function', () => {
  const fakeUser: User = {
    id: 'user-1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://example.com/avatar.png',
  };

  const fakeToken = 'fake-token';
  const loginData = { email: 'jane@example.com', password: 'password123' };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setAuthUserActionCreator with user after login success', async () => {
    const dispatch = vi.fn();
    vi.spyOn(api, 'login').mockResolvedValue(fakeToken);
    vi.spyOn(api, 'putAccessToken').mockImplementation(() => {});
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser);

    await asyncSetAuthUser(loginData)(dispatch);

    expect(api.login).toHaveBeenCalledWith(loginData);
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_AUTH_USER',
      payload: { authUser: fakeUser },
    });
  });

  it('should throw error and not dispatch if login fails', async () => {
    const dispatch = vi.fn();
    const fakeError = new Error('Invalid credentials');
    vi.spyOn(api, 'login').mockRejectedValue(fakeError);

    await expect(asyncSetAuthUser(loginData)(dispatch)).rejects.toThrow(
      'Invalid credentials'
    );
    expect(dispatch).not.toHaveBeenCalled();
  });
});

describe('asyncUnsetAuthUser', () => {
  it('should dispatch unsetAuthUserActionCreator and clear token', () => {
    const dispatch = vi.fn();
    const putAccessTokenSpy = vi.spyOn(api, 'putAccessToken');

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'UNSET_AUTH_USER',
      payload: { authUser: null },
    });
    expect(putAccessTokenSpy).toHaveBeenCalledWith('');
  });
});

describe('getAuthTokenUser', () => {
  it('should dispatch setAuthTokenUserActionCreator with token', () => {
    const dispatch = vi.fn();
    vi.spyOn(api, 'getAccessToken').mockReturnValue('dummy-token');

    getAuthTokenUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USER_TOKEN',
      payload: { token: 'dummy-token' },
    });
  });
});
