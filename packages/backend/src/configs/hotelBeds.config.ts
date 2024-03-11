import dotenv from 'dotenv';

dotenv.config();

type HTTP_RESQUET = {
	apiKey: string;
    apiSecret: string;
}
interface IHotelBedsConfig {
	hotelUrl: string;
	transferUrl: string;
	transferCacheUrl: string;
	hotelApi: HTTP_RESQUET;
    transferApi: HTTP_RESQUET;
}

const getRequiredEnvVariable = (name: string): string => {
	const value = process.env[name];

	if (!value) {
		throw new Error(`La variable de entorno ${name} no está definida.`);
	}

	return value;
};

const HOTEL_BEDS_DOMAIN = getRequiredEnvVariable('HOTEL_BEDS_DOMAIN');
const HOTEL_BEDS_VERSION = getRequiredEnvVariable('HOTEL_BEDS_VERSION');

const HOTEL_BEDS_HOTEL_PATH = getRequiredEnvVariable('HOTEL_BEDS_HOTEL_PATH');
const HOTEL_BEDS_HOTEL_API_KEY = getRequiredEnvVariable('HOTEL_BEDS_HOTEL_API_SECRET');
const HOTEL_BEDS_HOTEL_API_SECRET = getRequiredEnvVariable('HOTEL_BEDS_HOTEL_API_SECRET');

const HOTEL_BEDS_TRANSFER_PATH = getRequiredEnvVariable('HOTEL_BEDS_TRANSFER_PATH');
const HOTEL_BEDS_TRANSFER_CACHE_PATH = getRequiredEnvVariable('HOTEL_BEDS_TRANSFER_CACHE_PATH');
const HOTEL_BEDS_TRANSFER_API_KEY = getRequiredEnvVariable('HOTEL_BEDS_TRANSFER_API_KEY');
const HOTEL_BEDS_TRANSFER_API_SECRET = getRequiredEnvVariable('HOTEL_BEDS_TRANSFER_API_SECRET');

export const hotelBeds: IHotelBedsConfig = {
	hotelUrl: `${HOTEL_BEDS_DOMAIN}/${HOTEL_BEDS_HOTEL_PATH}/${HOTEL_BEDS_VERSION}`,
	transferUrl: `${HOTEL_BEDS_DOMAIN}/${HOTEL_BEDS_TRANSFER_PATH}/${HOTEL_BEDS_VERSION}`,
	transferCacheUrl: `${HOTEL_BEDS_DOMAIN}/${HOTEL_BEDS_TRANSFER_CACHE_PATH}/${HOTEL_BEDS_VERSION}`,
	transferApi: {
		apiKey: HOTEL_BEDS_TRANSFER_API_KEY,
		apiSecret: HOTEL_BEDS_TRANSFER_API_SECRET,
	},
	hotelApi: {
		apiKey: HOTEL_BEDS_HOTEL_API_KEY,
		apiSecret: HOTEL_BEDS_HOTEL_API_SECRET,
	}
};
