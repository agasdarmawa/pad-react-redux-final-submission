import { UnknownAction } from '@reduxjs/toolkit';
import { Leaderboard } from '@/types/leaderboard';
import { ActionType } from './action';

const initialState: Leaderboard[] = [];

interface SetLeaderboardsAction {
	type: typeof ActionType.SET_LEADERBOARDS;
	payload: {
		leaderboards: Leaderboard[];
	};
	[key: string]: unknown;
}

function isSetLeaderboardsAction(
  action: UnknownAction
): action is SetLeaderboardsAction {
  if (
    typeof action === 'object' &&
		action !== null &&
		action.type === ActionType.SET_LEADERBOARDS &&
		'payload' in action
  ) {
    const payload = (action as { payload?: unknown }).payload;
    return (
      typeof payload === 'object' &&
			payload !== null &&
			Array.isArray((payload as { leaderboards?: unknown }).leaderboards)
    );
  }
  return false;
}

function leaderboardsReducer(
  state = initialState,
  action: UnknownAction
): Leaderboard[] {
  if (isSetLeaderboardsAction(action)) {
    return action.payload.leaderboards;
  }
  return state;
}

export default leaderboardsReducer;
