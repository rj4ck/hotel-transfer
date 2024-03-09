import dotenv from 'dotenv';

dotenv.config();

interface IBaseConfig {
    env: string;
    port: number;
    apiRoot: string;
    appName: string;
    hostname: string;
}
export const baseConfig: IBaseConfig = {
	apiRoot: '/',
	appName: 'Hotel Transfer',
	port: process.env.PORT ? parseInt(process.env.PORT): 3000,
	hostname: process.env.HOSTNAME ?? 'localhost',
	env: process.env.NODE_ENV ?? 'development',
};
