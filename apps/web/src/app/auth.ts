import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { IUser } from "@repo/interfaces";
import { API } from "./api";

async function logIn(email: string, password: string): Promise<IUser | undefined> {
	try {
		const res = await fetch(API.auth + "/log-in", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.json();
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}

export const { auth, signIn, handlers, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await logIn(email, password);
					if (!user) return null;
					return user;
				}
				console.log("Invalid credentials");
				return null;
			},
		}),
	],
});
