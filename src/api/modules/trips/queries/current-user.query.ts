import IpApiService from "../../../../services/ip-api.service";

class CurrentUserQuery {
    public static async execute (publicAddress: undefined | string) {

        let address = publicAddress;

        if (publicAddress?.includes('localhost')) {
            const { ip } = await IpApiService.getPublicIp('') as { ip: string };

            address = ip
        }

        const { lat, lon, city, country, countryCode } = await IpApiService.checking(`/${address}`) as Record<string, string>;

        return { lat, lon, city, country, countryCode }
    }
}

export default CurrentUserQuery;
