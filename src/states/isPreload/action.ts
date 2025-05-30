import { Dispatch } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import {
  startLoadingBar,
  completeLoadingBar,
} from '@/utils/loading-bar-control';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload: boolean) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch: Dispatch) => {
    startLoadingBar();

    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      completeLoadingBar();
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
