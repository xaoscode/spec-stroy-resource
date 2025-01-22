import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
		serverActions: {
			allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [],
		},
	},
	images: {
		domains: process.env.IMAGE_DOMAINS?.split(",") || ["localhost"],
	},
};

export default nextConfig;
