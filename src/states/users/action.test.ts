import { describe, it, vi, expect, beforeEach } from 'vitest';
import {
  asyncRegisterUser,
  asyncPopulateUsers,
  asyncGetUserById,
  receiveUsersActionCreator,
} from './action';
import api from '@/utils/api';
import { User } from '@/types/user';
import { Register } from '@/types/auth';

/**
 * test scenarios for user actions
 *
 * - asyncRegisterUser
 *   - should return response when registration successful
 *   - should throw error when registration fails
 *
 * - asyncPopulateUsers
 *   - should dispatch receiveUsersActionCreator when data fetching successful
 *   - should not throw when fetching users fails
 *
 * - asyncGetUserById
 *   - should return user when data fetching successful
 *   - should not throw when fetching user by ID fails
 */

describe('user action creators', () => {
  const fakeUsers: User[] = [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar1.png',
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://example.com/avatar2.png',
    },
  ];

  const fakeUser: User = fakeUsers[0];
  const fakeRegisterData: Register = {
    name: 'New User',
    email: 'new@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('asyncRegisterUser', () => {
    it('should return response when registration successful', async () => {
      const fakeResponse = {
        user: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      };
      vi.spyOn(api, 'register').mockResolvedValue(fakeResponse);

      const result = await asyncRegisterUser(fakeRegisterData)();

      expect(api.register).toHaveBeenCalledWith(fakeRegisterData);
      expect(result).toEqual(fakeResponse);
    });

    it('should throw error when registration fails', async () => {
      const fakeError = new Error('Registration failed');
      vi.spyOn(api, 'register').mockRejectedValue(fakeError);

      await expect(asyncRegisterUser(fakeRegisterData)()).rejects.toThrow(
        'Registration failed'
      );
    });
  });

  describe('asyncPopulateUsers', () => {
    it('should dispatch receiveUsersActionCreator when data fetching successful', async () => {
      vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsers);
      const dispatch = vi.fn();

      await asyncPopulateUsers()(dispatch);

      expect(api.getAllUsers).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        receiveUsersActionCreator(fakeUsers)
      );
    });

    it('should not throw when fetching users fails', async () => {
      vi.spyOn(api, 'getAllUsers').mockRejectedValue(
        new Error('Failed to fetch')
      );
      const dispatch = vi.fn();

      await expect(asyncPopulateUsers()(dispatch)).resolves.toBeUndefined();
    });
  });

  describe('asyncGetUserById', () => {
    it('should return user when data fetching successful', async () => {
      vi.spyOn(api, 'getUserById').mockResolvedValue(fakeUser);

      const result = await asyncGetUserById(fakeUser.id)();

      expect(api.getUserById).toHaveBeenCalledWith(fakeUser.id);
      expect(result).toEqual(fakeUser);
    });

    it('should not throw when fetching user by ID fails', async () => {
      vi.spyOn(api, 'getUserById').mockRejectedValue(new Error('Not found'));

      await expect(asyncGetUserById('user-unknown')()).resolves.toBeUndefined();
    });
  });
});
