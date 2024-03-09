import dotenv from 'dotenv';

dotenv.config();
interface IHotelBedsConfig {
    domain: string;
    apiKey: string;
    apiSecret: string;
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
const HOTEL_BEDS_API_KEY = getRequiredEnvVariable('HOTEL_BEDS_API_KEY');
const HOTEL_BEDS_API_SECRET = getRequiredEnvVariable('HOTEL_BEDS_API_SECRET');

export const hotelBeds: IHotelBedsConfig = {
	domain: `${HOTEL_BEDS_DOMAIN}/${HOTEL_BEDS_VERSION}`,
	apiKey: HOTEL_BEDS_API_KEY,
	apiSecret: HOTEL_BEDS_API_SECRET,
};
