export interface IHotels {
	code: string;
}

export interface IHotelsRequest {
	checkIn: string;
	checkOut: string;
	shiftDays?: number
	allowOnlyShift?: boolean
}
