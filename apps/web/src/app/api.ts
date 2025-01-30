export const API = {
	BASE_URL: process.env.WEBSITE_DOMAIN,
	base: process.env.NEXT_PUBLIC_API_DOMAIN,
	auth: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/auth",
	projects: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/projects",
	services: {
		priemPrices: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/servies/priemPrices",
	},
	pages: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/pages",
	communication: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/communication",
};
