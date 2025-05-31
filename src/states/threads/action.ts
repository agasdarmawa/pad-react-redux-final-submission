import {
  ThreadFormType,
  Thread,
  DetailThread,
  DetailThreadComment,
} from '@/types/thread';
import api from '@/utils/api';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  startLoadingBar,
  completeLoadingBar,
} from '@/utils/loading-bar-control';

const ActionType = {
  ADD_THREAD: 'ADD_THREAD',
  GET_ALL_THREADS: 'GET_ALL_THREADS',
  GET_THREAD_OWNER: 'GET_THREAD_OWNER',
  GET_THREAD_DETAIL: 'GET_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  CLEAR_ALL_THREADS: 'CLEAR_ALL_THREADS',
  ADD_THREAD_COMMENT: 'ADD_THREAD_COMMENT',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
  UPVOTE_COMMENT_THREAD: 'UPVOTE_COMMENT_THREAD',
  DOWNVOTE_COMMENT_THREAD: 'DOWNVOTE_COMMENT_THREAD',
  NEUTRAL_VOTE_COMMENT_THREAD: 'NEUTRAL_VOTE_COMMENT_THREAD',
  LOADING_DETAIL_THREAD: 'LOADING_DETAIL_THREAD',
  GET_THREAD_DETAIL_FAILED: 'GET_THREAD_DETAIL_FAILED',
  GET_THREADS_BY_CATEGORY: 'GET_THREADS_BY_CATEGORY',
  SET_THREADS_BY_CATEGORY: 'SET_THREADS_BY_CATEGORY',
  CLEAR_THREADS_BY_CATEGORY: 'CLEAR_THREADS_BY_CATEGORY',
  SET_ALL_CATEGORIES: 'SET_ALL_CATEGORIES',
} as const;

export type ThreadAction =
  | ReturnType<typeof setThreadActionCreator>
  | ReturnType<typeof setAllCategoriesActionCreator>
  | ReturnType<typeof setThreadsListActionCreator>
  | ReturnType<typeof setDetailThreadActionCreator>
  | ReturnType<typeof unsetDetailThreadActionCreator>
  | ReturnType<typeof unsetThreadsListActionCreator>
  | ReturnType<typeof addThreadCommentActionCreator>
  | ReturnType<typeof upvoteThreadActionCreator>
  | ReturnType<typeof downvoteThreadActionCreator>
  | ReturnType<typeof neutralVoteThreadActionCreator>
  | ReturnType<typeof upvoteCommentThreadActionCreator>
  | ReturnType<typeof downvoteCommentThreadActionCreator>
  | ReturnType<typeof neutralVoteCommentThreadActionCreator>;

function setThreadActionCreator(thread: Thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function setAllCategoriesActionCreator(categories: string[]) {
  return {
    type: ActionType.SET_ALL_CATEGORIES,
    payload: { categories },
  };
}

function setThreadsByCategoryActionCreator(threads: Thread[]) {
  return {
    type: ActionType.SET_THREADS_BY_CATEGORY,
    payload: { threads },
  };
}

function clearThreadsByCategoryActionCreator() {
  return {
    type: ActionType.CLEAR_THREADS_BY_CATEGORY,
  };
}

function setDetailThreadActionCreator(detailThread: DetailThread) {
  return {
    type: ActionType.GET_THREAD_DETAIL,
    payload: {
      detailThread,
    },
  };
}

function addThreadCommentActionCreator(comment: DetailThreadComment) {
  return {
    type: ActionType.ADD_THREAD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upvoteThreadActionCreator(userId: string, threadId: string) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: { userId, threadId },
  };
}

function downvoteThreadActionCreator(userId: string, threadId: string) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: { userId, threadId },
  };
}

function neutralVoteThreadActionCreator(userId: string, threadId: string) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: { userId, threadId },
  };
}

function upvoteCommentThreadActionCreator(userId: string, commentId: string) {
  return {
    type: ActionType.UPVOTE_COMMENT_THREAD,
    payload: { userId, commentId },
  };
}

function downvoteCommentThreadActionCreator(userId: string, commentId: string) {
  return {
    type: ActionType.DOWNVOTE_COMMENT_THREAD,
    payload: { userId, commentId },
  };
}

function neutralVoteCommentThreadActionCreator(
  userId: string,
  commentId: string
) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT_THREAD,
    payload: { userId, commentId },
  };
}

function unsetDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
    payload: {
      detailThread: null,
    },
  };
}

function setThreadsListActionCreator(threads: Thread[]) {
  return {
    type: ActionType.GET_ALL_THREADS,
    payload: {
      threads,
    },
  };
}

function unsetThreadsListActionCreator() {
  return {
    type: ActionType.CLEAR_ALL_THREADS,
    payload: {
      threads: [],
    },
  };
}

function asyncCreateThread({ title, category, body }: ThreadFormType) {
  return async (dispatch: Dispatch) => {
    startLoadingBar();
    try {
      const thread = await api.createThread({ title, category, body });
      dispatch(setThreadActionCreator(thread));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncGetThreadsList() {
  return async (dispatch: Dispatch) => {
    startLoadingBar();
    try {
      const threads = await api.getThreadsWithOwnerProfiles();

      dispatch(setThreadsListActionCreator(threads));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncUpvoteThread({ threadId }: { threadId: string }) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getState().authUser?.id as string;

    startLoadingBar();

    try {
      await api.upvoteSelectedThread({ threadId });
      dispatch(upvoteThreadActionCreator(userId, threadId));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncDownvoteThread({ threadId }: { threadId: string }) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getState().authUser?.id as string;

    startLoadingBar();

    try {
      await api.downVoteSelectedThread({ threadId });
      dispatch(downvoteThreadActionCreator(userId, threadId));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncNeutralVoteThread({ threadId }: { threadId: string }) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getState().authUser?.id as string;

    startLoadingBar();

    try {
      await api.neutralizeVoteSelectedThread({ threadId });
      dispatch(neutralVoteThreadActionCreator(userId, threadId));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncUpvoteCommentThread({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getState().authUser?.id as string;

    startLoadingBar();

    try {
      await api.upvoteCommentThread({ threadId, commentId });

      dispatch(upvoteCommentThreadActionCreator(userId, commentId));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncDownvoteCommentThread({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getState().authUser?.id as string;

    startLoadingBar();

    try {
      await api.downVoteCommentThread({ threadId, commentId });

      dispatch(downvoteCommentThreadActionCreator(userId, commentId));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncNeutralCommentThread({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getState().authUser?.id as string;

    startLoadingBar();

    try {
      await api.neutralizeVoteCommentThread({ threadId, commentId });

      dispatch(neutralVoteCommentThreadActionCreator(userId, commentId));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncGetDetailThread(threadId: string) {
  return async (dispatch: Dispatch) => {
    startLoadingBar();
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(setDetailThreadActionCreator(detailThread));
      return detailThread;
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

function asyncCreateThreadReply({
  threadId,
  content,
}: {
  threadId: string;
  content: string;
}) {
  return async (dispatch: Dispatch) => {
    startLoadingBar();
    try {
      const newComment = await api.createThreadReply({ threadId, content });

      dispatch(addThreadCommentActionCreator(newComment));
    } catch {
    } finally {
      completeLoadingBar();
    }
  };
}

export const asyncGetThreadsByCategory = (category: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const threads = await api.getThreadsByCategory(category);
      dispatch(setThreadsByCategoryActionCreator(threads));
    } catch {}
  };
};

export function asyncGetAllCategories() {
  return async (dispatch: Dispatch) => {
    try {
      const categories = await api.getAllCategoryThreads();
      dispatch(setAllCategoriesActionCreator(categories));
    } catch {}
  };
}

export {
  ActionType,
  setThreadActionCreator,
  asyncCreateThread,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralVoteThread,
  setThreadsListActionCreator,
  asyncGetThreadsList,
  asyncGetDetailThread,
  upvoteThreadActionCreator,
  asyncUpvoteCommentThread,
  asyncDownvoteCommentThread,
  asyncNeutralCommentThread,
  neutralVoteThreadActionCreator,
  asyncCreateThreadReply,
  neutralVoteCommentThreadActionCreator,
  upvoteCommentThreadActionCreator,
  unsetDetailThreadActionCreator,
  addThreadCommentActionCreator,
  downvoteCommentThreadActionCreator,
  setDetailThreadActionCreator,
  unsetThreadsListActionCreator,
  setThreadsByCategoryActionCreator,
  clearThreadsByCategoryActionCreator,
  setAllCategoriesActionCreator,
};
