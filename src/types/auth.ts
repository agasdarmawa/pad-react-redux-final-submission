export interface Register {
	email: string;
	name: string;
	password: string;
}

export interface Login {
	email: string;
	password: string;
}

export interface Response {
	status: string;
	message: string;
	data: unknown;
}
