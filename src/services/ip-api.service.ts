import { ipApiConfig } from '../configs';
import createApiClient from '../utils/external-request';

class IpApiService {
    public static getPublicIp = createApiClient('https://api.ipify.org/?format=json')
    public static checking = createApiClient(ipApiConfig.url)
}

export default IpApiService
