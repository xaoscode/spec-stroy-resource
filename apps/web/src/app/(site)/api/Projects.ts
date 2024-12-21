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
  page: number,
  limit: number,
  service?: string,
  sector?: string,
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(service && { service }),
    ...(sector && { sector }),
  });
  const url =
    service || sector
      ? `${API.projects}/filter?${params.toString()}`
      : `${API.projects}/all?${params.toString()}`;

  const response = await fetch(url);
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
