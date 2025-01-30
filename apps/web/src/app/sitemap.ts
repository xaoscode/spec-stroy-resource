import type { MetadataRoute } from "next";
import { allProjects } from "./(site)/api/Projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const domain = "https://ssr-db.ru";
	let dynamicPages = [];

	try {
		dynamicPages = await allProjects();
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
