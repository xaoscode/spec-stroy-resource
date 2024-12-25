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
		console.error("Upload section Error:", error);
		throw error;
	}
}

export async function swapSectionsAction(sourceSectionId: string, destinationSectionId: string) {
	try {
		await fetch(`${API.pages}/swap-sections`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ sourceSectionId, destinationSectionId }),
			cache: "no-cache",
		});
	} catch (error) {
		console.log("Swap section error", error);
		throw error;
	}
}

export async function deletSectionsAction(sectionId: string) {
	try {
		await fetch(`${API.pages}/delet-section`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ sectionId }),
			cache: "no-cache",
		});
	} catch (error) {
		console.log("Delete section error", error);
		throw error;
	}
}
