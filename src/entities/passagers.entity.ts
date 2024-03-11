interface IPaxes {
    type: string;
    age: number;
}
export interface IPassage {
    room: number;
    adults: number;
    children: number;
    paxes: IPaxes[];
}
