import { API } from "@/app/api";
import { IProject, IProjectFilters } from "@repo/interfaces";

export async function getProject(id: string) {
	try {
		const response = await fetch(`${API.projects}/get/${id}`, { method: "GET" });
		if (!response.ok) {
			console.error(`Failed to fetch product data: ${response.statusText}`);
			throw new Error("API responded with an error");
		}
		const project = await response.json();
		return { ...project, success: true };
	} catch (error) {
		console.log("Update content error", error);
		return { success: false, error: error };
	}
}

export async function getProjects(page: number, limit: number) {
	try {
		const response = await fetch(`${API.projects}?page=${page}&limit=${limit}`);
		if (!response.ok) {
			console.error(`Failed to fetch product data: ${response.statusText}`);
			throw new Error("API responded with an error");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Update content error", error);
		return { success: false, error: error };
	}
}

export async function getFiveLatestProjects() {
	try {
		const response = await fetch(`${API.projects}/five-latest`, { cache: "no-cache" });
		if (!response.ok) {
			console.error(`Failed to fetch product data: ${response.statusText}`);
			throw new Error("API responded with an error");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		return { success: false, error: error };
	}
}

export async function fetchFilteredProjects(page: number, limit: number, filters?: IProjectFilters) {
	const params = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
		...(filters?.sector && { sector: filters.sector }),
		...(filters?.service && { service: filters.service }),
		...(filters?.search && { search: filters.search }),
	});
	try {
		const url = `${API.projects}/filter?${params.toString()}`;

		const response = await fetch(url, { cache: "no-cache" });
		if (!response.ok) {
			throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
		}
		const data = await response.json();
		return { data: data, success: true };
	} catch (error) {
		console.log("Update content error", error);
		return { success: false };
	}
}

export async function fetchProjectsCout(filters?: IProjectFilters) {
	const params = new URLSearchParams({
		...(filters?.sector && { sector: filters.sector }),
		...(filters?.service && { service: filters.service }),
		...(filters?.search && { search: filters.search }),
	});

	try {
		const url = `${API.projects}/count?${params.toString()}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Ошибка загрузки проектов: ${response.statusText}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Update content error", error);
		return { success: false, error: error };
	}
}

export async function addProject(newProject: IProject) {
	await fetch(`${API.projects}`, {
		method: "POST",
		headers: {},
		body: JSON.stringify(newProject),
	});
}

export async function deleteProject(id: number) {
	const response = await fetch(`${API.projects}/${id}`, {
		method: "DELETE",
	});
	return response.ok;
}

export async function allProjects() {
	const dynamicPages = await fetch(`http://spec-stroy-resource-api:3001/api/projects/all`)
		.then((res) => res.json())
		.then((pages) =>
			pages.map((page: IProject) => ({
				url: `https://ssr-db.ru/projects/${page.id}`,
				lastModified: new Date(),
				changeFrequency: "monthly",
				priority: 0.5,
			}))
		);
	return dynamicPages;
}
