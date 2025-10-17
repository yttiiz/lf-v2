export type AuthError = {
	message: string;
	field?: string;
};

export type AuthResult = {
	success: boolean;
	error?: AuthError;
	user?: any;
};

export type UserRegistrationType = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	image?: string;
};
