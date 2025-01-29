import type { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import { API } from "./api";

async function refreshToken(token: JWT): Promise<JWT | null> {
	const res = await fetch(API.auth + "/refresh", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token.backendTokens.refreshToken}`,
		},
	});
	if (res.statusText === "Unauthorized") {
		return null;
	}
	const response = await res.json();

	return {
		...token,
		backendTokens: response,
	};
}

export const authConfig = {
	pages: {
		signIn: "/admin/login",
	},
	trustHost: true,
	callbacks: {
		authorized({ auth, request: { nextUrl, headers } }) {
			console.log("admin", headers.get("host"));
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/admin");
			const isOnLogin = nextUrl.pathname.startsWith("/admin/login");

			if (isOnLogin && isLoggedIn) {
				return Response.redirect(new URL("/admin/panel", nextUrl));
			}
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false;
			}
			return true;
		},

		async jwt({ token, user }) {
			if (user) {
				return { ...token, ...user };
			}
			const now = Date.now();
			if (now < token.backendTokens.accessExp) {
				return token;
			}

			try {
				const newToken = await refreshToken(token);
				if (newToken) {
					return newToken;
				} else {
					console.log("Token refresh failed, returning original token.");
				}
			} catch (error) {
				console.error("Error while refreshing token:", error);
			}

			return null;
		},

		async session({ token, session, trigger }) {
			if (trigger === "update") {
				console.log("update session");
			}
			session.user = token.user;
			session.backendTokens = token.backendTokens;

			return session;
		},
	},

	providers: [],
} satisfies NextAuthConfig;
