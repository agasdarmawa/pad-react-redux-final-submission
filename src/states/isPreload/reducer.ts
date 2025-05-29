import { ActionType } from './action';

interface SetIsPreloadAction {
	type: typeof ActionType.SET_IS_PRELOAD;
	payload: {
		isPreload: boolean;
	};
}

function isSetIsPreloadAction(action: unknown): action is SetIsPreloadAction {
  if (typeof action === 'object' && action !== null) {
    const act = action as Record<string, unknown>;

    return (
      act.type === ActionType.SET_IS_PRELOAD &&
			typeof act.payload === 'object' &&
			act.payload !== null &&
			typeof (act.payload as Record<string, unknown>).isPreload === 'boolean'
    );
  }
  return false;
}

function isPreloadReducer(isPreload = true, action: unknown): boolean {
  if (isSetIsPreloadAction(action)) {
    return action.payload.isPreload;
  }

  return isPreload;
}

export default isPreloadReducer;
