import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  addThreadCommentActionCreator,
  asyncCreateThread,
  asyncCreateThreadReply,
  asyncDownvoteCommentThread,
  asyncDownvoteThread,
  asyncGetAllCategories,
  asyncGetDetailThread,
  asyncGetThreadsByCategory,
  asyncGetThreadsList,
  asyncNeutralCommentThread,
  asyncNeutralVoteThread,
  asyncUpvoteCommentThread,
  asyncUpvoteThread,
  downvoteCommentThreadActionCreator,
  neutralVoteCommentThreadActionCreator,
  neutralVoteThreadActionCreator,
  setAllCategoriesActionCreator,
  setDetailThreadActionCreator,
  setThreadActionCreator,
  setThreadsByCategoryActionCreator,
  setThreadsListActionCreator,
  upvoteCommentThreadActionCreator,
  upvoteThreadActionCreator,
} from './action';
import api from '@/utils/api';
import * as loadingBar from '@/utils/loading-bar-control';
import { Thread } from '@/types/thread';
import { ThreadState } from './reducer';

/**
 * test scenarios for asyncCreateThread thunk
 *
 * - asyncCreateThread
 *  - should dispatch setThreadActionCreator and call loading bar functions when thread is created successfully
 *  - should call loading bar functions even when API call fails
 */

/**
 * test scenarios for asyncGetThreadsList thunk
 *
 * - asyncGetThreadsList
 *  - should dispatch setThreadsListActionCreator and call loading bar functions when successful
 *  - should call loading bar functions even when request fails
 */

/**
 * test scenarios for asyncUpvoteThread thunk
 *
 * - asyncUpvoteThread
 *  - should dispatch upvoteThreadActionCreator and call loading bar functions when successful
 *  - should call loading bar functions even if upvote fails
 */

/**
 * test scenarios for asyncDownvoteThread thunk
 *
 * - asyncDownvoteThread
 *  - should dispatch downvoteThreadActionCreator and call loading bar functions on success
 *  - should call loading bar functions and log error when API call fails
 */

/**
 * test scenarios for asyncNeutralVoteThread thunk
 *
 * - asyncNeutralVoteThread
 *  - should dispatch neutralVoteThreadActionCreator and call loading bar functions on success
 *  - should call loading bar functions even when API call fails
 */

/**
 * test scenarios for asyncUpvoteCommentThread thunk
 *
 * - asyncUpvoteCommentThread
 *  - should dispatch upvoteCommentThreadActionCreator and call loading bar functions on success
 *  - should call loading bar functions even when API call fails
 */

/**
 * test scenarios for asyncDownvoteCommentThread thunk
 *
 * - asyncDownvoteCommentThread
 *  - should dispatch downvoteCommentThreadActionCreator and call loading bar functions on success
 *  - should call loading bar functions even when API call fails
 */

/**
 * test scenarios for asyncNeutralCommentThread thunk
 *
 * - asyncNeutralCommentThread
 *  - should dispatch neutralVoteCommentThreadActionCreator and call loading bar functions on success
 *  - should call loading bar functions even when API call fails
 */

/**
 * test scenarios for asyncGetDetailThread thunk
 *
 * - asyncGetDetailThread
 *  - should dispatch setDetailThreadActionCreator and call loading bar functions on success
 *  - should call loading bar functions even when API call fails
 */

/**
 * test scenarios for asyncCreateThreadReply thunk
 *
 * - asyncCreateThreadReply
 *  - should dispatch addThreadCommentActionCreator and call loading bar functions on success
 *  - should call loading bar functions even when API call fails
 */

/**
 * test scenarios for asyncGetThreadsByCategory thunk
 *
 * - asyncGetThreadsByCategory
 *  - should dispatch setThreadsByCategoryActionCreator when API call succeeds
 *  - should not dispatch any action and handle failure gracefully
 */

/**
 * test scenarios for asyncGetAllCategories thunk
 *
 * - asyncGetAllCategories
 *  - should dispatch setAllCategoriesActionCreator when API call succeeds
 *  - should log error and not dispatch any action when API call fails
 */

const threadId = 'thread-1';
const userId = 'user-123';

const mockThreadData: ThreadState = {
  threads: [],
  detailThread: null,
  categories: [],
};

const getState = vi.fn(() => ({
  authUser: {
    id: userId,
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://avatar.example.com/test.png',
  },
  isPreload: false,
  users: [],
  threadData: mockThreadData,
  leaderboards: [],
}));

describe('asyncCreateThread thunk', () => {
  const fakeThread: Thread = {
    id: 'thread-1',
    title: 'Thread Title',
    body: 'Thread body content',
    category: 'general',
    createdAt: '2023-01-01',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  };

  const form = {
    title: 'Thread Title',
    body: 'Thread body content',
    category: 'general',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setThreadActionCreator and call loading bar functions when thread is created successfully', async () => {
    api.createThread = vi.fn(() => Promise.resolve(fakeThread));
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncCreateThread(form)(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setThreadActionCreator(fakeThread));
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions even when API call fails', async () => {
    const form = { title: 'Test', category: 'Test', body: 'Test' };
    vi.spyOn(api, 'createThread').mockRejectedValue(new Error('Network error'));
    const dispatch = vi.fn();

    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await expect(asyncCreateThread(form)(dispatch)).resolves.toBeUndefined();

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(
      setThreadActionCreator(expect.anything())
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncGetThreadsList thunk', () => {
  const fakeThreads: Thread[] = [
    {
      id: 'thread-1',
      title: 'Test Thread',
      body: 'This is a test thread',
      category: 'test',
      createdAt: '2023-01-01',
      ownerId: 'user-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setThreadsListActionCreator and call loading bar functions when successful', async () => {
    api.getThreadsWithOwnerProfiles = vi.fn(() => Promise.resolve(fakeThreads));
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncGetThreadsList()(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      setThreadsListActionCreator(fakeThreads)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions even when request fails', async () => {
    api.getThreadsWithOwnerProfiles = vi.fn(() =>
      Promise.reject(new Error('API error'))
    );
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncGetThreadsList()(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(
      setThreadsListActionCreator(expect.anything())
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncUpvoteThread thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch upvoteThreadActionCreator and call loading bar functions when successful', async () => {
    api.upvoteSelectedThread = vi.fn(() => Promise.resolve());
    const dispatch = vi.fn();

    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncUpvoteThread({ threadId })(dispatch, getState);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      upvoteThreadActionCreator(userId, threadId)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions even if upvote fails', async () => {
    api.upvoteSelectedThread = vi.fn(() => Promise.reject(new Error('Fail')));
    const dispatch = vi.fn();

    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncUpvoteThread({ threadId })(dispatch, getState);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(
      upvoteThreadActionCreator(expect.anything(), expect.anything())
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncDownvoteThread thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch downvoteThreadActionCreator and call loading bar functions on success', async () => {
    vi.spyOn(api, 'downVoteSelectedThread').mockResolvedValue(undefined);
    const dispatch = vi.fn();

    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncDownvoteThread({ threadId })(dispatch, getState);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'DOWNVOTE_THREAD',
      payload: { userId, threadId },
    });
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions and log error when API call fails', async () => {
    vi.spyOn(api, 'downVoteSelectedThread').mockRejectedValue(
      new Error('Network error')
    );
    const dispatch = vi.fn();

    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncDownvoteThread({ threadId })(dispatch, getState);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith({
      type: 'DOWNVOTE_THREAD',
      payload: { userId, threadId },
    });
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncNeutralVoteThread thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch neutralVoteThreadActionCreator and call loading bar functions on success', async () => {
    api.neutralizeVoteSelectedThread = vi.fn(() => Promise.resolve());
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncNeutralVoteThread({ threadId })(dispatch, getState);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadActionCreator(userId, threadId)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions even when API call fails', async () => {
    api.neutralizeVoteSelectedThread = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncNeutralVoteThread({ threadId })(dispatch, getState);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(expect.anything()); // No action dispatched on error
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncUpvoteCommentThread thunk', () => {
  const threadId = 'thread-1';
  const commentId = 'comment-1';

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch upvoteCommentThreadActionCreator and call loading bar functions on success', async () => {
    api.upvoteCommentThread = vi.fn(() => Promise.resolve());
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncUpvoteCommentThread({ threadId, commentId })(dispatch, getState);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      upvoteCommentThreadActionCreator(userId, commentId)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions even when API call fails', async () => {
    api.upvoteCommentThread = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncUpvoteCommentThread({ threadId, commentId })(dispatch, getState);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(expect.anything()); // No dispatch on failure
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncDownvoteCommentThread thunk', () => {
  const threadId = 'thread-1';
  const commentId = 'comment-1';

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch downvoteCommentThreadActionCreator and call loading bar functions on success', async () => {
    api.downVoteCommentThread = vi.fn(() => Promise.resolve());
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncDownvoteCommentThread({ threadId, commentId })(
      dispatch,
      getState
    );

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      downvoteCommentThreadActionCreator(userId, commentId)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions even when API call fails', async () => {
    api.downVoteCommentThread = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncDownvoteCommentThread({ threadId, commentId })(
      dispatch,
      getState
    );

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(expect.anything()); // No dispatch on failure
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncNeutralCommentThread thunk', () => {
  const threadId = 'thread-1';
  const commentId = 'comment-1';
  const userId = 'user-1';

  const getState = vi.fn(() => ({
    authUser: {
      id: userId,
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://avatar.example.com/test.png',
    },
    isPreload: false,
    users: [],
    threadData: mockThreadData,
    leaderboards: [],
  }));

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch neutralVoteCommentThreadActionCreator and call loading bar functions on success', async () => {
    api.neutralizeVoteCommentThread = vi.fn(() => Promise.resolve());
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncNeutralCommentThread({ threadId, commentId })(
      dispatch,
      getState
    );

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteCommentThreadActionCreator(userId, commentId)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions even when API call fails', async () => {
    api.neutralizeVoteCommentThread = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncNeutralCommentThread({ threadId, commentId })(
      dispatch,
      getState
    );

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(expect.anything());
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncGetDetailThread thunk', () => {
  const threadId = 'thread-1';
  const detailThreadMock = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setDetailThreadActionCreator and call loading bar functions on success', async () => {
    api.getThreadDetail = vi.fn(() => Promise.resolve(detailThreadMock));
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    const nextState = await asyncGetDetailThread(threadId)(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      setDetailThreadActionCreator(detailThreadMock)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
    expect(nextState).toEqual(detailThreadMock);
  });

  it('should call loading bar functions even when API call fails', async () => {
    api.getThreadDetail = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    const nextState = await asyncGetDetailThread(threadId)(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(expect.anything());
    expect(completeLoadingSpy).toHaveBeenCalled();
    expect(nextState).toBeUndefined();
  });
});

describe('asyncCreateThreadReply thunk', () => {
  const threadId = 'thread-1';
  const content = 'This is a reply';
  const newCommentMock = {
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

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch addThreadCommentActionCreator and call loading bar functions on success', async () => {
    api.createThreadReply = vi.fn(() => Promise.resolve(newCommentMock));
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncCreateThreadReply({ threadId, content })(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      addThreadCommentActionCreator(newCommentMock)
    );
    expect(completeLoadingSpy).toHaveBeenCalled();
  });

  it('should call loading bar functions even when API call fails', async () => {
    api.createThreadReply = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    const dispatch = vi.fn();
    const startLoadingSpy = vi.spyOn(loadingBar, 'startLoadingBar');
    const completeLoadingSpy = vi.spyOn(loadingBar, 'completeLoadingBar');

    await asyncCreateThreadReply({ threadId, content })(dispatch);

    expect(startLoadingSpy).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(expect.anything());
    expect(completeLoadingSpy).toHaveBeenCalled();
  });
});

describe('asyncGetThreadsByCategory thunk', () => {
  const category = 'technology';
  const threadsMock = [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setThreadsByCategoryActionCreator when API call succeeds', async () => {
    api.getThreadsByCategory = vi.fn(() => Promise.resolve(threadsMock));
    const dispatch = vi.fn();

    await asyncGetThreadsByCategory(category)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      setThreadsByCategoryActionCreator(threadsMock)
    );
  });

  it('should not dispatch any action and handle failure gracefully', async () => {
    api.getThreadsByCategory = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    const dispatch = vi.fn();

    await asyncGetThreadsByCategory(category)(dispatch);

    expect(dispatch).not.toHaveBeenCalled();
  });
});

describe('asyncGetAllCategories thunk', () => {
  const categoriesMock = ['technology', 'news', 'sports'];

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setAllCategoriesActionCreator when API call succeeds', async () => {
    api.getAllCategoryThreads = vi.fn(() => Promise.resolve(categoriesMock));
    const dispatch = vi.fn();

    await asyncGetAllCategories()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      setAllCategoriesActionCreator(categoriesMock)
    );
  });

  it('should log error and not dispatch any action when API call fails', async () => {
    const error = new Error('Network error');
    api.getAllCategoryThreads = vi.fn(() => Promise.reject(error));
    const dispatch = vi.fn();

    await asyncGetAllCategories()(dispatch);

    expect(dispatch).not.toHaveBeenCalled();
  });
});
