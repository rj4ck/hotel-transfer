import React from "react";
import { IUser } from "@/entities/users.entity";
import tripTypesList from '@/jsonData/trip-types.json'
import { IMenuOptions, ITransfers, IAirportTerminals, ICities, IHotels } from "@/entities";
import { getCookie, setCookie } from "@/utils/browser-cookie-manager";
import { stringDateFormat } from "@/utils/formatter-date";
import createApiClient from "@/utils/internal-request";
import useBooking, { IUseBooking } from "@/app/hooks/useBooking";

interface HotelTransferProps extends IUseBooking{
    isLoading: boolean;
    isLoadingHotels: boolean;
    isLoadingBooking: boolean;
    isLoadingServices: boolean;
    isLoadingLocations: boolean;

    currentUser?: IUser;

    citySelected?: IMenuOptions;
    hotelSelected?: IMenuOptions;
    countrySelected?: IMenuOptions;
    airportSelected?: IMenuOptions;

    //toLocation?: string;
    servicesAvailable?: ITransfers[]

    adultsNumber: number;
    infantsNumber: number;
    childrenNumber: number;
    returnDate: Date;
    departureDate: Date;

    tripType: IMenuOptions;
    hotelsByCityList: IHotels[];
    citiesByCountryList: ICities[];
    airportTerminalList: IAirportTerminals[];

    handleTripType: (type: IMenuOptions) => void
    handleCitySelected: (city: IMenuOptions) => void
    handleHotelSelected: (city: IMenuOptions) => void
    handleCountrySelected: (country: IMenuOptions) => void;
    handleAirportSelected: (airport: IMenuOptions) => void

    handleReturnDate: (date: Date) => void
    handleDepartureDate: (date: Date) => void

    handleAdultsNumber: (number: number) => void;
    handleInfantsNumber: (number: number) => void;
    handleChildrenNumber: (number: number) => void;
    fetchServiceAvailable: () => void;
    handleConfirmBooking: (payload: unknown) => void;
}

interface HotelTransferProviderProps {
    children: React.ReactNode
}

const MyContext = React.createContext<HotelTransferProps>({
    isLoading: false,
    isLoadingHotels: false,
    isLoadingBooking: false,
    isLoadingServices: false,
    isLoadingLocations: false,
    //countrySelected,
    //airportSelected,
    tripType: tripTypesList[0],
    adultsNumber: 2,
    infantsNumber: 0,
    childrenNumber: 0,

    hotelsByCityList: [],
    citiesByCountryList: [],
    airportTerminalList: [],

    returnDate: new Date(),
    departureDate: new Date(),
    servicesAvailable: [],
    //destinationList: [],
    handleReturnDate: () => {},
    handleDepartureDate: () => {},

    handleTripType: () => {},
    handleCitySelected: () => {},
    handleHotelSelected: () => {},
    handleCountrySelected: () => {},
    handleAirportSelected: () => {},

    handleAdultsNumber: () => {},
    handleInfantsNumber: () => {},
    handleChildrenNumber: () => {},
    fetchServiceAvailable: () => {},
    handleSearchBooking: () => {},
    handleCancelBooking: () => {},
    handleConfirmBooking: () => {}
});

const HotelTransferProvider: React.FC<HotelTransferProviderProps> = ({ children }) => {
    const currentDate = new Date();

    const booking = useBooking()

    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 2);

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isLoadingHotels, setIsLoadingHotels] = React.useState<boolean>(false)
    const [isLoadingServices, setIsLoadingServices] = React.useState<boolean>(false)

    const [isLoadingLocations, setIsLoadingLocations] = React.useState<boolean>(false);

    const [hotelsByCityList, setHotelsByCityList] = React.useState<IHotels[]>([])
    const [citiesByCountryList, setCitiesByCountryList] = React.useState<ICities[]>([])
    const [airportTerminalList, setAirportTerminals] = React.useState<IAirportTerminals[]>([])

    const [currentUser, setCurrentUser] = React.useState<IUser>()

    const [tripType, setTripType] = React.useState<IMenuOptions>(tripTypesList[0])
    const [citySelected, setCitySelected] = React.useState<IMenuOptions>()
    const [hotelSelected, setHotelSelected] = React.useState<IMenuOptions>()
    const [countrySelected, setCountrySelected] = React.useState<IMenuOptions>()
    const [airportSelected, setAirportSelected] = React.useState<IMenuOptions>()

    const [returnDate, setReturnDate] = React.useState<Date>(nextDay)
    const [departureDate, setDepartureDate] = React.useState<Date>(nextDay)

    const [servicesAvailable, setServicesAvailable] = React.useState<ITransfers[]>()

    const [adultsNumber, setAdultsNumber] = React.useState<number>(2)
    const [infantsNumber, setInfantsNumber] = React.useState<number>(0)
    const [childrenNumber, setChildrenNumber] = React.useState<number>(0)

    React.useEffect(() => {

        (async() => {

            setIsLoading(true)

            if (!currentUser) {
                const storedUser = getCookie('current-user');

                if (!storedUser) {
                    const data = await createApiClient('trips/current-user').get()

                    setCurrentUser(data);
                    setCookie('current-user', JSON.stringify(data));
                } else {
                    setCurrentUser(JSON.parse(storedUser));
                }
            }

            if (!departureDate) {
                setDepartureDate(currentDate)
            }

            if (!returnDate) {
                setReturnDate(nextDay)
            }

            setIsLoading(false)
        })()
    }, [])

    React.useEffect(() => {
        if (tripType.value === 'round') {

            const returnedDate = new Date(nextDay);
            returnedDate.setDate(nextDay.getDate() + 1);

            setReturnDate(returnedDate)
        }
    }, [tripType, departureDate])

    React.useEffect(() => {
        if (currentUser !== undefined) {
            const { homeLocation } = currentUser as IUser

            if (!countrySelected) {

                setCountrySelected({
                    label: homeLocation.country,
                    value: homeLocation.countryCode
                })
            }
        }
    }, [currentUser])

    React.useEffect(() => {
        (async () => {
            setIsLoadingLocations(true)

            setCitySelected(undefined)
            setHotelSelected(undefined)
            setAirportSelected(undefined)

            if (countrySelected?.value !== '') {
                const cities = await createApiClient(`locations/destinations?countryCode=${countrySelected?.value}`).get();
                const airports = await createApiClient(`locations/airport-terminals?countryCode=${countrySelected?.value}`).get();

                setCitiesByCountryList(cities);
                setAirportTerminals(airports);
            }

            setIsLoadingLocations(false)
        })()
    }, [countrySelected])
    React.useEffect(() => {
        (async () => {
            setIsLoadingHotels(true)

            if (citySelected?.value !== '') {
                const hotels = await createApiClient(`locations/hotels?countryCode=${countrySelected?.value}&cityCode=${citySelected?.value}`).get();

                setHotelsByCityList(hotels);
            }

            setIsLoadingHotels(false)
        })()
    }, [citySelected])

    const fetchServiceAvailable = async () => {
        setIsLoadingServices(true)
        setServicesAvailable(undefined)

        const parameters = {
            toType: 'ATLAS',
            fromType: 'IATA',
            adults: adultsNumber,
            infants: infantsNumber,
            outbound: stringDateFormat(departureDate),
            children: childrenNumber,
            toCode: hotelSelected?.value,
            fromCode: airportSelected?.value,
            ...(tripType.value === 'round' && { inbound: stringDateFormat(returnDate) }),
        }

        try {
            const data = await createApiClient('transfers').post(parameters)

            setServicesAvailable(data)
        } finally {
            setIsLoadingServices(false)
        }
    }
    const handleTripType = (type: IMenuOptions) => setTripType(type)
    const handleCountrySelected = (country: IMenuOptions) => setCountrySelected(country)
    const handleHotelSelected = (hotel: IMenuOptions) => setHotelSelected(hotel)
    const handleAdultsNumber = (number: number) => setAdultsNumber(number)
    const handleInfantsNumber = (number: number) => setInfantsNumber(number)
    const handleChildrenNumber = (number: number) => setChildrenNumber(number)
    const handleReturnDate = (date: Date) => setReturnDate(date)
    const handleDepartureDate = (date: Date) => setDepartureDate(date)
    const handleCitySelected = (cityCode: IMenuOptions) => setCitySelected(cityCode)
    const handleAirportSelected = (airport: IMenuOptions) => setAirportSelected(airport)

    const memoizedValue = React.useMemo(() => {
        return {
            isLoading,
            isLoadingHotels,
            isLoadingLocations,
            currentUser,
            citySelected,
            hotelSelected,
            airportSelected,
            servicesAvailable,
            hotelsByCityList,
            citiesByCountryList,
            airportTerminalList,

        };
    }, [isLoading, isLoadingHotels, isLoadingLocations, currentUser, airportTerminalList, airportSelected, citySelected, hotelSelected, hotelsByCityList, citiesByCountryList, servicesAvailable]);

    return (
        <MyContext.Provider value={{
            ...memoizedValue,
            ...booking,
            adultsNumber,
            infantsNumber,
            childrenNumber,
            returnDate,
            departureDate,
            countrySelected,
            tripType,
            isLoadingServices,
            fetchServiceAvailable,
            handleAdultsNumber,
            handleInfantsNumber,
            handleChildrenNumber,
            handleTripType,
            handleCitySelected,
            handleHotelSelected,
            handleCountrySelected,
            handleAirportSelected,
            handleReturnDate,
            handleDepartureDate,
        }}>
            {children}
        </MyContext.Provider>
    );
}

const useHotelTransfer = () => {
    const context = React.useContext(MyContext);

    if (!context) {
        throw new Error('useHotelTransfer must be used within a HotelTransferProvider');
    }

    return context;

}

export { HotelTransferProvider, useHotelTransfer };
export default HotelTransferProvider;
