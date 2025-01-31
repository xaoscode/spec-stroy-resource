"use server";

import { API } from "@/app/api";
import { auth } from "@/app/auth";
import { IBlock, IContent, INewBlock, INewContent, INewSection, ISection } from "@repo/interfaces";
import { revalidatePath } from "next/cache";

export async function addSectionAction(contentData: INewSection, id: string) {
	try {
		const session = await auth();

		await fetch(`${API.pages}/create-section/${id}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...contentData }),
			cache: "no-cache",
		});
		revalidatePath("/", "layout");
	} catch (error) {
		console.error("Upload section Error:", error);
		throw error;
	}
}

export async function addContentAction(contentData: INewContent, id: string) {
	try {
		const session = await auth();

		await fetch(`${API.pages}/create-content/${id}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...contentData }),
			cache: "no-cache",
		});
		revalidatePath("/", "layout");
	} catch (error) {
		console.error("Upload section Error:", error);
		throw error;
	}
}

export async function reorderAction(pageId: string, sourceItemId: string, destinationPosition: number, parentTable: string, childTable: string) {
	try {
		const session = await auth();

		await fetch(`${API.pages}/reorder-items`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ pageId, sourceItemId, destinationPosition, parentTable, childTable }),
			cache: "no-cache",
		});
		revalidatePath("/", "layout");
	} catch (error) {
		console.log("Swap section error", error);
		throw error;
	}
}

export async function deleteAction(data: { id: string; childTable: string; parentTable: string; parentId: string }) {
	try {
		const session = await auth();
		const response = await fetch(`${API.pages}/delet-item`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...data }),
			cache: "no-cache",
		});
		if (!response.ok) {
			return { success: false, error: "Failed to remove" };
		}
		revalidatePath("/", "layout");
		return { success: true };
	} catch (error) {
		console.log("Delete section error", error);
		throw error;
	}
}

export async function addBlockAction(contentData: INewBlock) {
	try {
		const session = await auth();
		const response = await fetch(`${API.pages}/create-block`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...contentData }),
			cache: "no-cache",
		});

		if (!response.ok) {
			return { success: false, error: "Failed to save" };
		}
		revalidatePath("/", "layout");
		return { success: true };
	} catch (error) {
		console.error("Upload section Error:", error);
		throw error;
	}
}

export async function updateSection(content: ISection) {
	try {
		const session = await auth();
		const response = await fetch(`${API.pages}/update-section`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...content }),
			cache: "no-cache",
		});

		if (!response.ok) {
			return { success: false, error: "Failed to save content" };
		}
		revalidatePath("/", "layout");
		return { success: true };
	} catch (error) {
		console.error("Update content error", error);
		return { success: false, error: error };
	}
}

export async function updateContent(content: IContent) {
	try {
		const session = await auth();

		const response = await fetch(`${API.pages}/update-content`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...content }),
			cache: "no-cache",
		});

		if (!response.ok) {
			return { success: false, error: "Failed to save content" };
		}

		revalidatePath("/", "layout");
		return { success: true };
	} catch (error) {
		console.error("Update content error", error);
		return { success: false, error: error };
	}
}

export async function updateBlock(data: { content: IBlock; file?: File }) {
	try {
		const session = await auth();
		const formData = new FormData();

		if (data.file) {
			formData.append("image", data.file);
		}

		formData.append("content", JSON.stringify({ ...data.content }));
		const response = await fetch(`${API.pages}/update-block`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
			},
			body: formData,
			cache: "no-cache",
		});

		if (!response.ok) {
			return { success: false, error: "Failed to save content" };
		}
		revalidatePath("/", "layout");

		return { success: true };
	} catch (error) {
		console.log("Update content error", error);
		return { success: false, error: error };
	}
}
