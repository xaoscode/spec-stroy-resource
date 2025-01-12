"use server";
import { API } from "@/app/api";
import { auth } from "@/app/auth";
import { INewProject } from "@repo/interfaces";
import { revalidatePath } from "next/cache";

export async function updateProject(data: { content: IProject; files?: File[] }) {
	try {
		const session = await auth();
		const formData = new FormData();

		if (data.files) {
			data.files.forEach((image) => {
				formData.append("images", image);
			});
		}

		formData.append("content", JSON.stringify({ ...data.content }));
		console.log(data.content);
		const response = await fetch(`${API.projects}/update-project`, {
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
		revalidatePath("/");

		return { success: true };
	} catch (error) {
		console.log("Update content error", error);
		return { success: false, error: error };
	}
}

export async function addProject(content: INewProject, images: File[]) {
	const formData = new FormData();

	images.forEach((image) => {
		formData.append("images", image);
	});

	formData.append("content", JSON.stringify({ ...content }));

	try {
		const session = await auth();
		const response = await fetch(`${API.projects}/add`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
			},
			body: formData,
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

export async function getProject(id: string) {
	try {
		const session = await auth();

		const response = await fetch(`${API.projects}/get/${id}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
			},
			cache: "no-cache",
		});

		if (!response.ok) {
			return { success: false, error: "Failed to save content" };
		}

		return response.json();
	} catch (error) {
		console.log("Update content error", error);
		return { success: false, error: error };
	}
}
