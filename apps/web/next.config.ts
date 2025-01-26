import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3002",
				pathname: "/uploads/**",
			},
			{
				protocol: "http",
				hostname: "spec-stroy-resource-api",
				port: "3001",
				pathname: "/uploads/**",
			},
		],
	},
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
};

export default nextConfig;
