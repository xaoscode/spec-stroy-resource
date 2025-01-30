"use server";
import type { MetadataRoute } from "next";
import { IProject } from "@repo/interfaces";
import { API } from "./api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const domain = process.env.WEBSITE_DOMAIN;
	let dynamicPages = [];

	try {
		dynamicPages = await fetch(`${API.projects}/all`)
			.then((res) => res.json())
			.then((pages) =>
				pages.map((page: IProject) => ({
					url: `${domain}/projects/${page.id}`,
					lastModified: new Date(),
					changeFrequency: "monthly",
					priority: 0.5,
				}))
			);
	} catch (error) {
		console.error("Error fetching dynamic pages:", error);
	}

	const staticPages = [
		{
			url: `${domain}`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${domain}/about`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${domain}/calculator`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.9,
		},
		{
			url: `${domain}/contacts`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${domain}/dopusk`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${domain}/politika-konfidencialnosti`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${domain}/services/stroy`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${domain}/services/instrumental`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${domain}/services/bim`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${domain}/services/complex`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${domain}/services/engineering`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];
	return [...staticPages, ...dynamicPages];
}
