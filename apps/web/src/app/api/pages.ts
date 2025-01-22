"use server";
import { API } from "../api";

export async function fetchPage(slug: string) {
	try {
		const response = await fetch(`${API.pages}/get/${slug}`, {
			method: "GET",
		});
		if (!response.ok) {
			throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
		}
		const data = await response.json();
		return { ...data, success: true };
	} catch (error) {
		console.log("Update content error", error);
		return { success: false };
	}
}
