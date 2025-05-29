export interface Leaderboard {
	user: UserLeaderboard;
	score: number;
}

export interface UserLeaderboard {
	id: string;
	name: string;
	email: string;
	avatar: string;
}
