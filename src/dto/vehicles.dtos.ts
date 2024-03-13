export interface IVehicleImages {
    url: string;
    type: string;
}

export interface IVehicles {
    code: string;
    name: string;
    images: IVehicleImages[]
}
