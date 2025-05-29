import { User } from './user';

export interface ThreadFormType {
	title: string;
	category?: string;
	body: string;
}

export interface DetailThread {
	id: string;
	title: string;
	body: string;
	createdAt: string;
	owner: {
		id: string;
		name: string;
		avatar: string;
	};
	category: string;
	comments: DetailThreadComment[];
	upVotesBy: string[];
	downVotesBy: string[];
}

export interface Owner {
	id: string;
	name: string;
	email: string;
	avatar: string;
}

export interface Comment {
	id: string;
	content: string;
	createdAt: string;
	upVotesBy: string[];
	downVotesBy: string[];
	owner: Owner;
}

export interface DetailThreadComment {
	id: string;
	content: string;
	createdAt: string;
	upVotesBy: string[];
	downVotesBy: string[];
	owner: {
		id: string;
		name: string;
		avatar: string;
	};
}

export interface ThreadReplyResponse {
	id: string;
	content: string;
	createdAt: string;
	upVotesBy: string[];
	downVotesBy: string[];
	owner: OwnerResponse;
}

export interface Thread {
	id: string;
	title: string;
	body: string;
	category: string;
	createdAt: string;
	ownerId: string;
	upVotesBy: string[];
	downVotesBy: string[];
	totalComments: number;
	owner?: User;
}

export interface ThreadWithOwner extends Omit<Thread, 'ownerId'> {
	owner: User;
}

export interface OwnerResponse {
	id: string;
	name: string;
	email: string;
	avatar: string;
}
