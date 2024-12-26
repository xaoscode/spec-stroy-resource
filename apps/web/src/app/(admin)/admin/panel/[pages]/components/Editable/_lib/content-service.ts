"use server";

import { API } from "@/app/api";
import { INewContent, INewSection } from "@repo/interfaces";
import { revalidatePath } from "next/cache";

// import { auth, signOut } from "@/auth";

export async function addSectionAction(contentData: INewSection, id: string) {
	try {
		await fetch(`${API.pages}/create-section/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...contentData }),
			cache: "no-cache",
		});
		revalidatePath("/");

		// return response.json();
	} catch (error) {
		console.error("Upload section Error:", error);
		throw error;
	}
}

export async function addContentAction(contentData: INewContent, id: string) {
	try {
		await fetch(`${API.pages}/create-content/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...contentData }),
			cache: "no-cache",
		});
		revalidatePath("/");

		// return response.json();
	} catch (error) {
		console.error("Upload section Error:", error);
		throw error;
	}
}

export async function reorderAction(pageId: string, sourceItemId: string, destinationPosition: number, parentTable: string, childTable: string) {
	try {
		await fetch(`${API.pages}/reorder-items`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ pageId, sourceItemId, destinationPosition, parentTable, childTable }),
			cache: "no-cache",
		});
		revalidatePath("/");
	} catch (error) {
		console.log("Swap section error", error);
		throw error;
	}
}

export async function deleteAction(sectionId: string, tableName: string) {
	try {
		await fetch(`${API.pages}/delet-section`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ sectionId, tableName }),
			cache: "no-cache",
		});
		revalidatePath("/");
	} catch (error) {
		console.log("Delete section error", error);
		throw error;
	}
}
