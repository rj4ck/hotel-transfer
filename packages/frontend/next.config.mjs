import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */

export default nextTranslate({
	webpack: (config, { isServer, webpack }) => {
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				port: '',
			},
		],
	},
});
