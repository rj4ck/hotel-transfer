import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */

export default {
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
