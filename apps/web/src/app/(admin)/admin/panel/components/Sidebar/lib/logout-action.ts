"use server";
import { API } from "@/app/api";
import { auth } from "@/app/auth";

export async function logoutAction() {
	const url = new URL(`${API.auth}/log-out`);
	const session = await auth();

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
			},
			cache: "no-cache",
		});
		return response;
	} catch (error) {
		throw error;
	}
}
