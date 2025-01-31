import { API } from "../../api";

export async function fetchPage(slug: string) {
	try {
		if (!API.base) {
			return { success: false };
		}
		const response = await fetch(`${API.pages}/get/${slug}`, {
			method: "GET",
			cache: "no-cache",
		});
		if (!response.ok) {
			throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
		}
		const data = await response.json();
		return { ...data, success: true };
	} catch (error) {
		return { success: false, error: error };
	}
}
