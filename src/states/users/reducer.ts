import { ActionType } from './action';
import { User } from '@/types/user';

interface ReceiveUsersAction {
	type: typeof ActionType.RECEIVE_USERS;
	payload: {
		users: User[];
	};
}

function isReceiveUsersAction(action: unknown): action is ReceiveUsersAction {
  return (
    typeof action === 'object' &&
		action !== null &&
		'type' in action &&
		action.type === ActionType.RECEIVE_USERS &&
		'payload' in action
  );
}

function usersReducer(users: User[] = [], action: unknown): User[] {
  if (isReceiveUsersAction(action)) {
    return action.payload.users;
  }

  return users;
}

export default usersReducer;
