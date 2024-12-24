export interface AdminAuthActionState {
	zodErrors: {
		email?: string[] | undefined | null;
		password?: string[] | undefined | null;
	};
	apiErrors: string;
	message: any;
	data: any;
}

export const INITIAL_STATE: AdminAuthActionState = {
	zodErrors: {
		email: null,
		password: null,
	},
	apiErrors: "",
	message: "",
	data: undefined,
};
