import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const domain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "example.com";

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/admin/",
		},
		sitemap: `${domain}/sitemap.xml"`,
	};
}
