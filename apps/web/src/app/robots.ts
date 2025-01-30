"use server";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
	const domain = process.env.WEBSITE_DOMAIN || "example.com";

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/admin/",
		},
		sitemap: `${domain}/sitemap.xml`,
	};
}
