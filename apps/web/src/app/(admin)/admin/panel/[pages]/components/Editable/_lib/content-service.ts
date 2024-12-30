"use server";

import { API } from "@/app/api";
import { IBlock, INewBlock, INewContent, INewSection } from "@repo/interfaces";
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

export async function deleteAction(id: string, childTable: string, parentTable: string, parentId: string) {
	try {
		await fetch(`${API.pages}/delet-item`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, parentTable, childTable, parentId }),
			cache: "no-cache",
		});
		revalidatePath("/");
	} catch (error) {
		console.log("Delete section error", error);
		throw error;
	}
}

export async function addBlockAction(contentData: INewBlock) {
	try {
		await fetch(`${API.pages}/create-block`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...contentData }),
			cache: "no-cache",
		});
		revalidatePath("/");
	} catch (error) {
		console.error("Upload section Error:", error);
		throw error;
	}
}

export async function updateBlock(content: IBlock) {
	try {
		const response = await fetch(`${API.pages}/update-content`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...content }),
			cache: "no-cache",
		});
		revalidatePath("/");
		if (!response.ok) {
			return { success: false, error: "Failed to save content" };
		}

		return { success: true };
	} catch (error) {
		console.log("Update content error", error);
		return { success: false, error: error.message };
	}
}
