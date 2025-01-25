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
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "padgevasya.ru",
				port: "",
				pathname: "/uploads/images**",
				search: "",
			},
		],
	},
};

export default nextConfig;
