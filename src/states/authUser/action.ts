import { Login } from '@/types/auth';
import { User } from '@/types/user';
import api from '@/utils/api';
import { Dispatch } from '@reduxjs/toolkit';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  SET_USER_TOKEN: 'SET_USER_TOKEN',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser: User | null) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function setAuthTokenUserActionCreator(token: string) {
  return {
    type: ActionType.SET_USER_TOKEN,
    payload: {
      token,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export type AuthUserAction =
  | ReturnType<typeof setAuthUserActionCreator>
  | ReturnType<typeof unsetAuthUserActionCreator>;

function asyncSetAuthUser({ email, password }: Login) {
  return async (dispatch: Dispatch) => {
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      throw error;
    }
  };
}

function getAuthTokenUser() {
  return (dispatch: Dispatch) => {
    const token = api.getAccessToken();
    dispatch(setAuthTokenUserActionCreator(token as string));
  };
}

function asyncUnsetAuthUser() {
  return (dispatch: Dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  getAuthTokenUser,
};
