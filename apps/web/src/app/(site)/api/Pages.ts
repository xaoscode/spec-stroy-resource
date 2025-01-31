import { API } from "../../api";

export async function fetchPage(slug: string) {
	try {
		if (!API.base) {
			return { success: false };
		}
		const response = await fetch(`${API.pages}/get/${slug}`, { cache: "default" });
		if (!response.ok) {
			throw new Error(`Ошибка загрузки страницы: ${response.statusText}`);
		}
		const data = await response.json();
		return { ...data, success: true };
	} catch (error) {
		console.log("Ошибка загрузки:", error);
		return { success: false };
	}
}

export async function fetchCachedPage(slug: string) {
	try {
		if (!API.base) {
			return { success: false };
		}
		const response = await fetch(`${API.pages}/get/${slug}`, { cache: "force-cache" });
		if (!response.ok) {
			throw new Error(`Ошибка загрузки страницы: ${response.statusText}`);
		}
		const data = await response.json();
		return { ...data, success: true };
	} catch (error) {
		console.log("Ошибка загрузки:", error);
		return { success: false };
	}
}
