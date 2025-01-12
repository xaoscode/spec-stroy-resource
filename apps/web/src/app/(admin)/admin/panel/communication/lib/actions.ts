"use server";
import { API } from "@/app/api";
import { auth } from "@/app/auth";
import { IComMessage } from "@repo/interfaces";
import { revalidatePath } from "next/cache";

export default async function updateMessage(data: IComMessage) {
	try {
		const session = await auth();
		console.log(data);
		const response = await fetch(`${API.communication}/update-message`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...data }),
			cache: "no-cache",
		});

		if (!response.ok) {
			return { success: false, error: "Failed to save content" };
		}
		revalidatePath("/");

		return { success: true };
	} catch (error) {
		console.log("Update content error", error);
		return { success: false, error: error };
	}
}
