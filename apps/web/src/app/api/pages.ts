import { API } from "../api";

export async function fetchPage(slug: string) {
	const response = await fetch(`${API.pages}/get/${slug}`, { cache: "no-cache" });
	if (!response.ok) {
		throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
	}
	return response.json();
}
