import { Reducer, UnknownAction } from '@reduxjs/toolkit';
import { ActionType, ThreadAction } from './action';
import { DetailThread, Thread } from '@/types/thread';

export type ThreadState = {
	threads: Thread[];
	detailThread: DetailThread | null;
	categories: string[];
};

const initialState: ThreadState = {
  threads: [],
  detailThread: null,
  categories: []
};

function isThreadAction(action: UnknownAction): action is ThreadAction {
  return typeof action.type === 'string' && action.type in ActionType;
}

export const threadReducer: Reducer<ThreadState, UnknownAction> = (
  state = initialState,
  action
): ThreadState => {
  if (!isThreadAction(action)) {
    return state;
  }

  switch (action.type) {
  case ActionType.ADD_THREAD:
    return {
      ...state,
      threads: [action.payload.thread, ...state.threads]
    };
  case ActionType.SET_ALL_CATEGORIES:
    return {
      ...state,
      categories: action.payload.categories
    };

  case ActionType.GET_ALL_THREADS:
    return {
      ...state,
      threads: action.payload.threads
    };
  case ActionType.GET_THREAD_DETAIL:
    return {
      ...state,
      detailThread: action.payload.detailThread
    };
  case ActionType.CLEAR_ALL_THREADS:
    return {
      ...state,
      threads: []
    };
  case ActionType.CLEAR_THREAD_DETAIL:
    return {
      ...state,
      detailThread: null
    };
  case ActionType.ADD_THREAD_COMMENT:
    if (!state.detailThread) return state;
    return {
      ...state,
      detailThread: {
        ...state.detailThread,
        comments: [action.payload.comment, ...state.detailThread.comments]
      }
    };

  case ActionType.UPVOTE_THREAD:
    return {
      ...state,
      detailThread: state.detailThread
        ? {
          ...state.detailThread,
          upVotesBy: [
            ...state.detailThread.upVotesBy,
            action.payload.userId
          ],
          downVotesBy: state.detailThread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          )
					  }
        : null,
      threads: state.threads.map((thread) =>
        thread.id === action.payload.threadId
          ? {
            ...thread,
            upVotesBy: [...thread.upVotesBy, action.payload.userId],
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
						  }
          : thread
      )
    };

  case ActionType.DOWNVOTE_THREAD:
    return {
      ...state,
      detailThread: state.detailThread
        ? {
          ...state.detailThread,
          downVotesBy: [
            ...state.detailThread.downVotesBy,
            action.payload.userId
          ],
          upVotesBy: state.detailThread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          )
					  }
        : null,
      threads: state.threads.map((thread) =>
        thread.id === action.payload.threadId
          ? {
            ...thread,
            downVotesBy: [...thread.downVotesBy, action.payload.userId],
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId
            )
						  }
          : thread
      )
    };

  case ActionType.NEUTRAL_VOTE_THREAD:
    return {
      ...state,
      detailThread: state.detailThread
        ? {
          ...state.detailThread,
          upVotesBy: state.detailThread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
          downVotesBy: state.detailThread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          )
					  }
        : null,
      threads: state.threads.map((thread) =>
        thread.id === action.payload.threadId
          ? {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
						  }
          : thread
      )
    };

  case ActionType.UPVOTE_COMMENT_THREAD:
    if (!state.detailThread) return state;
    return {
      ...state,
      detailThread: {
        ...state.detailThread,
        comments: state.detailThread.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
              ...comment,
              upVotesBy: [...comment.upVotesBy, action.payload.userId],
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId
              )
							  }
            : comment
        )
      }
    };

  case ActionType.DOWNVOTE_COMMENT_THREAD:
    if (!state.detailThread) return state;
    return {
      ...state,
      detailThread: {
        ...state.detailThread,
        comments: state.detailThread.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
              ...comment,
              downVotesBy: [...comment.downVotesBy, action.payload.userId],
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId
              )
							  }
            : comment
        )
      }
    };

  case ActionType.NEUTRAL_VOTE_COMMENT_THREAD:
    if (!state.detailThread) return state;
    return {
      ...state,
      detailThread: {
        ...state.detailThread,
        comments: state.detailThread.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId
              ),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId
              )
							  }
            : comment
        )
      }
    };

  default:
    return state;
  }
};

export default threadReducer;
