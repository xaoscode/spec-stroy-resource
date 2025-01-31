import { API } from "../../api";

export async function fetchPage(slug: string) {
	try {
		const response = await fetch(`${API.pages}/get/${slug}`, { cache: "force-cache" });
		if (!response.ok) {
			throw new Error(`Ошибка загрузки страницы: ${response.statusText}`);
		}
		const data = await response.json();
		return { ...data, success: true };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
}
