export const API = {
	base: process.env.NEXT_PUBLIC_DOMAIN,
	auth: process.env.NEXT_PUBLIC_DOMAIN + "/api/auth",
	projects: process.env.NEXT_PUBLIC_DOMAIN + "/api/projects",
	services: {
		priemPrices: process.env.NEXT_PUBLIC_DOMAIN + "/api/servies/priemPrices",
	},
	pages: process.env.NEXT_PUBLIC_DOMAIN + "/api/pages",
	communication: process.env.NEXT_PUBLIC_DOMAIN + "/api/communication",
};
