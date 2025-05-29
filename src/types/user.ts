export interface User {
	id: string;
	name: string;
	email: string;
	avatar: string;
}

export interface ActionUser {
	type: string;
	payload: {
		authUser: User;
	};
}

export interface UserCommentOwner {
	id: string;
	name: string;
	avatar: string;
}
