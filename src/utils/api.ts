import { Login, Register } from '@/types/auth';
import { Thread, ThreadFormType } from '@/types/thread';
import { User } from '@/types/user';

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url: string, options: RequestInit = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    });
  }

  function putAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ email, name, password }: Register) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        password
      })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user }
    } = responseJson;

    return user;
  }

  async function login({ email, password }: Login) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token }
    } = responseJson;

    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user }
    } = responseJson;

    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users }
    } = responseJson;

    return users;
  }

  async function getUserById(id: string) {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users }
    } = responseJson;

    const selectedUser = users.find((user: User) => user.id === id);

    return selectedUser;
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { leaderboards }
    } = responseJson;

    return leaderboards;
  }

  async function createThread({ title, category, body }: ThreadFormType) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        category,
        body
      })
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread }
    } = responseJson;

    return thread;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads }
    } = responseJson;

    return threads;
  }

  async function getThreadsWithOwnerProfiles() {
    const threads = await getAllThreads();

    const threadsWithOwnerProfiles = await Promise.all(
      threads.map(async (thread: Thread) => {
        const owner = await getUserById(thread.ownerId);
        return {
          ...thread,
          owner
        };
      })
    );

    return threadsWithOwnerProfiles;
  }

  async function getThreadsByCategory(category: string) {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads }
    } = responseJson;

    const filteredThreads = [...threads].filter(
      (thread) => thread.category === category
    );

    return filteredThreads;
  }

  async function getAllCategoryThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads }
    } = responseJson;

    const categories = [...threads].map((thread) => thread.category);

    const filteredCategories = [...new Set(categories)];

    return filteredCategories;
  }

  async function getThreadDetail(threadId: string) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread }
    } = responseJson;

    return detailThread;
  }

  async function createThreadReply({
    threadId,
    content
  }: {
		threadId: string;
		content: string;
	}) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content
        })
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { comment }
    } = responseJson;

    return comment;
  }

  async function upvoteCommentThread({
    threadId,
    commentId
  }: {
		threadId: string;
		commentId: string;
	}) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread }
    } = responseJson;

    return detailThread;
  }

  async function downVoteCommentThread({
    threadId,
    commentId
  }: {
		threadId: string;
		commentId: string;
	}) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread }
    } = responseJson;

    return detailThread;
  }

  async function neutralizeVoteCommentThread({
    threadId,
    commentId
  }: {
		threadId: string;
		commentId: string;
	}) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread }
    } = responseJson;

    return detailThread;
  }

  async function upvoteSelectedThread({ threadId }: { threadId: string }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread }
    } = responseJson;

    return detailThread;
  }

  async function downVoteSelectedThread({ threadId }: { threadId: string }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread }
    } = responseJson;

    return detailThread;
  }

  async function neutralizeVoteSelectedThread({
    threadId
  }: {
		threadId: string;
	}) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread }
    } = responseJson;

    return detailThread;
  }

  return {
    putAccessToken,
    getAccessToken,
    getUserById,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getLeaderboards,
    createThreadReply,
    upvoteSelectedThread,
    downVoteSelectedThread,
    neutralizeVoteSelectedThread,
    createThread,
    upvoteCommentThread,
    downVoteCommentThread,
    neutralizeVoteCommentThread,
    getAllThreads,
    getThreadDetail,
    getThreadsByCategory,
    getAllCategoryThreads,
    getThreadsWithOwnerProfiles
  };
})();

export default api;
