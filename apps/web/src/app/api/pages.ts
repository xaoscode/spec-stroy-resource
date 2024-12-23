import { API } from "../api";

export async function fetchPage(slug: string) {
	console.log(`${API.pages}/get/${slug}`);
	const response = await fetch(`${API.pages}/get/${slug}`);
	if (!response.ok) {
		throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
	}
	return response.json();
}
