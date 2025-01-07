"use server";

import { API } from "@/app/api";

export async function getService(slug: string) {
	try {
		const response = await fetch(`${API.pages}/get/${slug}`, {
			method: "GET",
			cache: "default",
		});
		if (!response.ok) {
			throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
		}
		return response.json();
	} catch (error) {
		if (error instanceof Error) {
			return "Something went wrong.";
		}
		throw error;
	}
}
