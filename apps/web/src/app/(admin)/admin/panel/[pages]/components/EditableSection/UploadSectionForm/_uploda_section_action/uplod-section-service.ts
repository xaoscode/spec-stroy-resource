"only server";

import { API } from "@/app/api";
import { ISection } from "@repo/interfaces";

// import { auth, signOut } from "@/auth";

export async function uploadSectionService(contentData: ISection, id: string) {
	try {
		const response = await fetch(`${API.pages}/create-section/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...contentData }),
			cache: "no-cache",
		});

		return response.json();
	} catch (error) {
		console.error("Upload Service Error:", error);
		throw error;
	}
}
