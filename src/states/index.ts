import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import threadReducer from './threads/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threadData: threadReducer,
    loadingBar: loadingBarReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
