import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
	webpack: (config: Configuration, { dev }: { dev: boolean }) => {
		if (dev) {
			config.cache = false;
		}
		return config;
	},
};

export default nextConfig;
