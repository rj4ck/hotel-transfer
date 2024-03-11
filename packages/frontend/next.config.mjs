import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */

export default {
	distDir: '../backend/src/.next',
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
