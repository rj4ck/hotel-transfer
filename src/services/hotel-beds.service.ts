import crypto from 'crypto';

import { hotelBeds, HTTP_REQUEST } from '../configs';
import createApiClient from '../utils/external-request';

const { transferUrl, transferApi, transferCacheUrl } = hotelBeds;

class HotelBedsService {
    private static generateHeaders({ apiKey, apiSecret }: HTTP_REQUEST) {

        const timestamp = Math.floor(Date.now() / 1000);

        return {
            'Api-key': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Signature': crypto.createHash('sha256').update(`${apiKey}${apiSecret}${timestamp}`).digest('hex')
        }

    }

    public static transfer = createApiClient(transferUrl, this.generateHeaders(transferApi))
    public static miscellaneous = createApiClient(transferCacheUrl, this.generateHeaders(transferApi))
}

export default HotelBedsService
