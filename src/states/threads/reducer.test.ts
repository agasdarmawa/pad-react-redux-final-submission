import { describe, it, expect } from 'vitest';
import threadReducer, { ThreadState } from './reducer';
import { ActionType } from './action';
import { Thread, DetailThread } from '@/types/thread';

/**
 * test scenario for threadReducer
 *
 * - threadReducer function
 *  - should return the initial state when given undefined state
 *  - should handle ADD_THREAD action by prepending new thread
 *  - should handle SET_ALL_CATEGORIES action
 *  - should handle GET_THREAD_DETAIL action
 *  - should handle ADD_THREAD_COMMENT action by prepending comment
 *  - should return current state for unknown action
 *  - should handle DOWNVOTE_THREAD action
 *  - should handle NEUTRAL_VOTE_THREAD action
 *  - should handle UPVOTE_COMMENT_THREAD action
 *  - should handle DOWNVOTE_COMMENT_THREAD action
 *  - should handle NEUTRAL_VOTE_COMMENT_THREAD action
 */

describe('threadReducer function', () => {
  const initialState: ThreadState = {
    threads: [],
    detailThread: null,
    categories: [],
  };

  const baseThread = {
    id: 'thread-1',
    title: 'Test Thread',
    body: 'Body content',
    category: 'general',
    createdAt: '2025-05-30T00:00:00Z',
  };

  const mockThread: Thread = {
    ...baseThread,
    ownerId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
  };

  const mockDetailThread: DetailThread = {
    ...mockThread,
    owner: {
      id: 'user-1',
      name: 'Jacob Doe',
      avatar: 'https://example.com/jacob.png',
    },
    comments: [],
    upVotesBy: [],
    downVotesBy: [],
  };

  const mockComment = {
    id: 'comment-1',
    content: 'A comment',
    createdAt: '2025-05-30T00:00:00Z',
    upVotesBy: ['user-3'],
    downVotesBy: ['user-4'],
    owner: {
      id: 'user-1',
      name: 'Jacob Doe',
      avatar: 'https://generated-image-url.jpg',
    },
  };

  const userId = 'user-5';

  const mockCommentNeutralVote = {
    ...mockComment,
    upVotesBy: [userId, ...mockComment.upVotesBy.filter((id) => id !== userId)],
    downVotesBy: [
      userId,
      ...mockComment.downVotesBy.filter((id) => id !== userId),
    ],
    owner: {
      id: 'user-1',
      name: 'Jacob Doe',
      avatar: 'https://example.com/avatar.png',
    },
  };

  it('should return the initial state when given undefined state', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = threadReducer(undefined, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle ADD_THREAD action by prepending new thread', () => {
    const prevState: ThreadState = {
      ...initialState,
      threads: [mockThread],
    };
    const newThread: Thread = {
      ...mockThread,
      id: 'thread-2',
      title: 'New Thread',
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };
    const nextState = threadReducer(prevState, action);
    expect(nextState.threads[0]).toEqual(newThread);
    expect(nextState.threads.length).toBe(2);
  });

  it('should handle SET_ALL_CATEGORIES action', () => {
    const categories = ['general', 'news', 'tech'];
    const action = {
      type: ActionType.SET_ALL_CATEGORIES,
      payload: { categories },
    };
    const nextState = threadReducer(initialState, action);
    expect(nextState.categories).toEqual(categories);
  });

  it('should handle GET_THREAD_DETAIL action', () => {
    const action = {
      type: ActionType.GET_THREAD_DETAIL,
      payload: { detailThread: mockDetailThread },
    };
    const nextState = threadReducer(initialState, action);
    expect(nextState.detailThread).toEqual(mockDetailThread);
  });

  it('should handle ADD_THREAD_COMMENT action by prepending comment', () => {
    const comment = {
      id: 'comment-1',
      content: 'Nice thread!',
      ownerId: 'user-2',
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2025-05-30T00:00:00Z',
    };

    const stateWithDetailThread: ThreadState = {
      ...initialState,
      detailThread: {
        ...mockDetailThread,
        comments: [],
      },
    };

    const action = {
      type: ActionType.ADD_THREAD_COMMENT,
      payload: { comment },
    };

    const nextState = threadReducer(stateWithDetailThread, action);
    expect(nextState.detailThread?.comments[0]).toEqual(comment);
  });

  it('should return current state when action type is unknown', () => {
    const prevState: ThreadState = {
      ...initialState,
      threads: [mockThread],
    };
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = threadReducer(prevState, action);
    expect(nextState).toEqual(prevState);
  });

  it('should handle DOWNVOTE_THREAD action', () => {
    const initialState: ThreadState = {
      threads: [mockThread],
      detailThread: mockDetailThread,
      categories: [],
    };

    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: {
        threadId: mockThread.id,
        userId,
      },
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState.detailThread?.downVotesBy).toContain(userId);
    expect(nextState.detailThread?.upVotesBy).not.toContain(userId);

    const updatedThread = nextState.threads.find((t) => t.id === mockThread.id);
    expect(updatedThread?.downVotesBy).toContain(userId);
    expect(updatedThread?.upVotesBy).not.toContain(userId);
  });

  it('should handle NEUTRAL_VOTE_THREAD action', () => {
    const initialState: ThreadState = {
      threads: [
        {
          ...mockThread,
          upVotesBy: [userId, ...mockThread.upVotesBy],
          downVotesBy: [userId, ...mockThread.downVotesBy],
        },
      ],
      detailThread: {
        ...mockDetailThread,
        upVotesBy: [userId, ...mockDetailThread.upVotesBy],
        downVotesBy: [userId, ...mockDetailThread.downVotesBy],
      },
      categories: [],
    };

    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: mockThread.id,
        userId,
      },
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState.detailThread?.upVotesBy).not.toContain(userId);
    expect(nextState.detailThread?.downVotesBy).not.toContain(userId);

    const updatedThread = nextState.threads.find((t) => t.id === mockThread.id);
    expect(updatedThread?.upVotesBy).not.toContain(userId);
    expect(updatedThread?.downVotesBy).not.toContain(userId);
  });

  it('should handle UPVOTE_COMMENT_THREAD action', () => {
    const initialState: ThreadState = {
      threads: [mockThread],
      detailThread: {
        ...mockDetailThread,
        comments: [mockComment],
      },
      categories: [],
    };

    const action = {
      type: ActionType.UPVOTE_COMMENT_THREAD,
      payload: {
        commentId: mockComment.id,
        userId: userId,
      },
    };

    const updatedState = threadReducer(initialState, action);

    // Find the updated comment
    const updatedComment = updatedState.detailThread?.comments.find(
      (comment) => comment.id === mockComment.id
    );

    expect(updatedComment).toBeDefined();

    expect(updatedComment!.upVotesBy).toContain(userId);
    expect(updatedComment!.downVotesBy).not.toContain(userId);
  });

  it('should handle DOWNVOTE_COMMENT_THREAD action', () => {
    const initialState: ThreadState = {
      threads: [mockThread],
      detailThread: {
        ...mockDetailThread,
        comments: [mockComment],
      },
      categories: [],
    };

    const action = {
      type: ActionType.DOWNVOTE_COMMENT_THREAD,
      payload: {
        commentId: mockComment.id,
        userId: userId,
      },
    };

    const updatedState = threadReducer(initialState, action);

    // Find the updated comment
    const updatedComment = updatedState.detailThread?.comments.find(
      (comment) => comment.id === mockComment.id
    );

    expect(updatedComment).toBeDefined();

    // userId should be added to downVotesBy and removed from upVotesBy on comment
    expect(updatedComment!.downVotesBy).toContain(userId);
    expect(updatedComment!.upVotesBy).not.toContain(userId);
  });

  it('should handle NEUTRAL_VOTE_COMMENT_THREAD action', () => {
    const initialState: ThreadState = {
      threads: [mockThread],
      detailThread: {
        ...mockDetailThread,
        comments: [
          {
            ...mockCommentNeutralVote,
            upVotesBy: [userId, ...mockCommentNeutralVote.upVotesBy],
            downVotesBy: [userId, ...mockCommentNeutralVote.downVotesBy],
          },
        ],
      },
      categories: [],
    };

    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT_THREAD,
      payload: {
        commentId: mockComment.id,
        userId,
      },
    };

    const nextState = threadReducer(initialState, action);
    const updatedComment = nextState.detailThread?.comments.find(
      (c) => c.id === mockComment.id
    );

    // userId should be removed from both vote arrays on comment
    expect(updatedComment?.upVotesBy).not.toContain(userId);
    expect(updatedComment?.downVotesBy).not.toContain(userId);
  });
});
