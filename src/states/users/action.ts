import { Register } from '@/types/auth';
import { User } from '@/types/user';
import api from '@/utils/api';
import { Dispatch } from '@reduxjs/toolkit';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users: User[]) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }: Register) {
  return async () => {
    try {
      const response = await api.register({ name, email, password });

      return response;
    } catch (error) {
      throw error;
    }
  };
}

function asyncPopulateUsers() {
  return async (dispatch: Dispatch) => {
    try {
      const users = await api.getAllUsers();

      dispatch(receiveUsersActionCreator(users));
    } catch {}
  };
}

function asyncGetUserById(id: string) {
  return async () => {
    try {
      const user = await api.getUserById(id);

      return user;
    } catch {
      return undefined;
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
  asyncGetUserById,
  asyncPopulateUsers,
};
