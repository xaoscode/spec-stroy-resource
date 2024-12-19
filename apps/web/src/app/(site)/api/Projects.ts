import { API } from "@/app/api";
import { IProject } from "@repo/interfaces";
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
export async function getFilteredProjects(
  page = 1,
  limit = 9,
  sector: string,
  service: string,
) {
  const response = await fetch(
    `${API.projects}/filter?page=${page}&limit=${limit}&sector=${sector}&service=${service}`,
  );
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
