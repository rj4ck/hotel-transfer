import React from "react";
import { IUser } from "@/dto/user.dtos";
import tripTypesList from '@/utils/trip-types.json'
import { DropOffTypes, IMenuOptions } from "@/entities";
import { IAirportTerminals, ICities, IHotels } from "@/dto/locations.dtos";
import { IServicesAvailable } from "@/dto/services-available.dtos";
import { getCookie, setCookie } from "@/utils/browser-cookie-manager";
import { stringDateFormat } from "@/utils/formatter-date";

interface HotelTransferProps {
    isLoading: boolean;
    isLoadingHotels: boolean;
    isLoadingServices: boolean;
    isLoadingLocations: boolean;

    currentUser?: IUser;

    citySelected?: IMenuOptions;
    hotelSelected?: IMenuOptions;
    countrySelected?: IMenuOptions;
    airportSelected?: IMenuOptions;

    //toLocation?: string;
    servicesAvailable?: IServicesAvailable[]

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
    handleConfirmBooking: () => {}
});

const HotelTransferProvider: React.FC<HotelTransferProviderProps> = ({ children }) => {
    const currentDate = new Date();

    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 2);

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isLoadingHotels, setIsLoadingHotels] = React.useState<boolean>(false)
    const [isLoadingLocations, setIsLoadingLocations] = React.useState<boolean>(false)
    const [isLoadingServices, setIsLoadingServices] = React.useState<boolean>(false)

    const [currentUser, setCurrentUser] = React.useState<IUser>()

    const [tripType, setTripType] = React.useState<IMenuOptions>(tripTypesList[0])
    const [citySelected, setCitySelected] = React.useState<IMenuOptions>()
    const [hotelSelected, setHotelSelected] = React.useState<IMenuOptions>()
    const [countrySelected, setCountrySelected] = React.useState<IMenuOptions>()
    const [airportSelected, setAirportSelected] = React.useState<IMenuOptions>()

    const [hotelsByCityList, setHotelsByCityList] = React.useState<IHotels[]>([])
    const [citiesByCountryList, setCitiesByCountryList] = React.useState<ICities[]>([])
    const [airportTerminalList, setAirportTerminals] = React.useState<IAirportTerminals[]>([])

    const [returnDate, setReturnDate] = React.useState<Date>(nextDay)
    const [departureDate, setDepartureDate] = React.useState<Date>(nextDay)

    const [servicesAvailable, setServicesAvailable] = React.useState<IServicesAvailable[]>()

    const [adultsNumber, setAdultsNumber] = React.useState<number>(2)
    const [infantsNumber, setInfantsNumber] = React.useState<number>(0)
    const [childrenNumber, setChildrenNumber] = React.useState<number>(0)

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
            const response = await fetch('/api/search', {
                method: 'POST',
                body: JSON.stringify(parameters),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error('Error al cargar la información del usuario');
            }

            const responseData = await response.json();

            setServicesAvailable(responseData)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoadingServices(false)
        }
    }

    const fetchInformation = async (path: string) => {
        try {
            //setIsLoading(true)

            const response = await fetch(path);

            if (!response.ok) {
                throw new Error('Error al cargar la información del usuario');
            }

            return response.json();

        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }

    React.useEffect(() => {

        (async() => {

            setIsLoading(true)

            if (!currentUser) {
                const storedUser = getCookie('current-user');

                if (!storedUser) {
                    const response = await fetchInformation('/api/trips/current-user');

                    setCurrentUser(response);
                    setCookie('current-user', JSON.stringify(response));
                } else {
                    setCurrentUser(JSON.parse(storedUser));
                }
            }

            /*if (countriesList.length === 0) {
                const response = await fetchInformation('/api/locations/countries');

                setCountriesList(response);

            }*/

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
                const cities = await fetchInformation(`/api/locations/destinations?countryCode=${countrySelected?.value}`);
                const airports = await fetchInformation(`/api/locations/airport-terminals?countryCode=${countrySelected?.value}`);

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
                const hotels = await fetchInformation(`/api/locations/hotels?countryCode=${countrySelected?.value}&cityCode=${citySelected?.value}`);

                setHotelsByCityList(hotels);
            }

            setIsLoadingHotels(false)
        })()
    }, [citySelected])

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

    const handleConfirmBooking = async (payload: unknown) => {
        try {
            const response = await fetch('/api/trips/booking', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error('Error al realizar booking de transfer');
            }

            const responseData = await response.json();

            console.log(responseData)

            //setServicesAvailable(responseData)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoadingServices(false)
        }
    }

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
            handleConfirmBooking
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
