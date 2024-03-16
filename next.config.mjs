import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */

export default {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				port: '',
			},
		],
	},
};
