"use server";
import type { MetadataRoute } from "next";
import { API } from "./api";

export default async function robots(): Promise<MetadataRoute.Robots> {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/admin/",
		},
		sitemap: `${API.BASE_URL}/sitemap.xml`,
	};
}
