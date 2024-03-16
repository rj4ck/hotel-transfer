export interface ILocationRequest {
    fields: string;
    language: string;
}

export interface ILocationResponse {
    name: string;
    code: string;
    language: string;
    countryCode: string;
}

export interface ITerminalResponse extends ILocationResponse {

}
