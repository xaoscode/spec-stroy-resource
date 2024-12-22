import { API } from "@/app/api";
import { IProject, IProjectFilters } from "@repo/interfaces";
export async function getProject(id: number) {
	const response = await fetch(`${API.projects}/${id}`);
	const data = await response.json();
	return data;
}
export async function getProjects(page: number, limit: number) {
	const response = await fetch(`${API.projects}?page=${page}&limit=${limit}`);
	const data = await response.json();
	return data;
}
export async function fetchFilteredProjects(page: number, limit: number, filters?: IProjectFilters) {
	const params = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
		...(filters?.sector && { sector: filters.sector }),
		...(filters?.service && { service: filters.service }),
		...(filters?.search && { search: filters.search }),
	});

	const url = `${API.projects}/filter?${params.toString()}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}
export async function fetchProjectsCout(filters?: IProjectFilters) {
	const params = new URLSearchParams({
		...(filters?.sector && { sector: filters.sector }),
		...(filters?.service && { service: filters.service }),
		...(filters?.search && { search: filters.search }),
	});

	const url = `${API.projects}/count?${params.toString()}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}
export async function addProject(newProject: IProject) {
	await fetch(`${API.projects}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newProject),
	});
}

export async function deleteProject(id: number) {
	const response = await fetch(`${API.projects}/${id}`, {
		method: "DELETE",
	});
	return response.ok;
}
