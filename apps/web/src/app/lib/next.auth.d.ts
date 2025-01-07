import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			image: string;
		};

		backendTokens: {
			accessToken: string;
			refreshToken: string;
			accessExp: number;
			refreshExp: number;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: {
			id: string;
			email: string;
			image: string;
			emailVerified: Date | null;
		};

		backendTokens: {
			accessToken: string;
			refreshToken: string;
			accessExp: number;
			refreshExp: number;
		};
	}
}
