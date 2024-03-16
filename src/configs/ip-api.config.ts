import { getRequiredEnvVariable } from "../utils/get-required-env-variables";

interface IIpAPi {
    url: string;
}
export const ipApiConfig: IIpAPi = {
	url: getRequiredEnvVariable('IP_API_URL'),
};
