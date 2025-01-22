"use server";
import { API } from "@/app/api";
import { auth } from "@/app/auth";
import { IImage, INewProject, IProject } from "@repo/interfaces";
import { revalidatePath } from "next/cache";

export async function updateProject(project: IProject) {
	try {
		const session = await auth();
		console.log(project);
		const response = await fetch(`${API.projects}/update-project`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...project }),
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
			return { success: false, error: "Failed to get project" };
		}

		return response.json();
	} catch (error) {
		console.log("Getting project error", error);
		return { success: false, error: error };
	}
}

export async function updateImage(image: IImage, file: File) {
	try {
		const session = await auth();
		const data = new FormData();
		data.append("file", file);
		data.append("content", JSON.stringify({ ...image }));
		const response = await fetch(`${API.projects}/update-image`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
			},
			body: data,
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

export async function deleteProject(id: string) {
	try {
		const session = await auth();

		const response = await fetch(`${API.projects}/delete-project/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
			},
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

export async function deleteImage(id: string) {
	try {
		const session = await auth();
		const response = await fetch(`${API.projects}/delete-image/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
			},
		});
		if (!response.ok) {
			return { success: false, error: "Failed to delete image" };
		}
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		console.log("Delete image error", error);
		return { success: false, error: error };
	}
}

export async function addImage(id: string) {
	try {
		const session = await auth();
		const response = await fetch(`${API.projects}/add-image/${id}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.accessToken}`,
			},
		});
		if (!response.ok) {
			return { success: false, error: "Failed to delete image" };
		}
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		console.log("Delete image error", error);
		return { success: false, error: error };
	}
}
