import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#fef2e0',
					100: '#fde4bf',
					200: '#fccf8f',
					300: '#fabf66',
					400: '#f8ab3e',
					500: '#f69915',
					600: '#e58214',
					700: '#c76912',
					800: '#9c4f10',
					900: '#7c3f0e',
				},
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
};
export default config;
