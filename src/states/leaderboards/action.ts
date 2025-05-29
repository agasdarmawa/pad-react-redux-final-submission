import { Dispatch } from '@reduxjs/toolkit';
import api from '@/utils/api';
import { Leaderboard } from '@/types/leaderboard';
// import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  SET_LEADERBOARDS: 'SET_LEADERBOARDS',
} as const;

function setLeaderboardsActionCreator(leaderboards: Leaderboard[]) {
  return {
    type: ActionType.SET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncGetLeaderboards() {
  return async (dispatch: Dispatch) => {
    // dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(setLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(hideLoading());
    }
  };
}

export { ActionType, setLeaderboardsActionCreator, asyncGetLeaderboards };
