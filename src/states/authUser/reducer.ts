import { ActionType } from './action';
import { User } from '@/types/user';
import { UnknownAction } from '@reduxjs/toolkit';

function isSetAuthUserAction(action: UnknownAction): action is {
	type: typeof ActionType.SET_AUTH_USER;
	payload: { authUser: User };
} {
  return action.type === ActionType.SET_AUTH_USER && 'payload' in action;
}

function isUnsetAuthUserAction(action: UnknownAction): action is {
	type: typeof ActionType.UNSET_AUTH_USER;
	payload: { authUser: null };
} {
  return action.type === ActionType.UNSET_AUTH_USER && 'payload' in action;
}

function authUserReducer(
  authUser: User | null = null,
  action: UnknownAction
): User | null {
  if (isSetAuthUserAction(action)) {
    return action.payload.authUser;
  }
  if (isUnsetAuthUserAction(action)) {
    return null;
  }
  return authUser;
}

export default authUserReducer;
