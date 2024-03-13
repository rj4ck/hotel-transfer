import React from "react";
import { IUser } from "@/dto/user.dtos";
import { DropOffTypes } from "@/entities";
import { ICountries, ILocation } from "@/dto/locations.dtos";
import { IServicesAvailable } from "@/dto/services-available.dtos";
import { getCookie, setCookie } from "@/utils/browser-cookie-manager";

interface HotelTransferProps {
    isLoading: boolean;
    currentUser?: IUser;
    fromLocation?: ILocation;
    countriesList?: ICountries[];
    servicesAvailable?: IServicesAvailable[]
    handleReturnDate: (date: Date) => void
    handleDepartureDate: (date: Date) => void
    handleToLocation: (location: ILocation) => void
    handleFromLocation: (location: ILocation) => void
    handleDropOffType: (type: DropOffTypes) => void
    adultsNumber?: number;
    infantsNumber?: number;
    childrenNumber?: number;
    returnDate: Date;
    departureDate: Date;
    handleAdultsNumber: (number: number) => void;
    handleInfantsNumber: (number: number) => void;
    handleChildrenNumber: (number: number) => void;
}

interface HotelTransferProviderProps {
    children: React.ReactNode
}

const MyContext = React.createContext<HotelTransferProps>({
    isLoading: false,
    returnDate: new Date(),
    departureDate: new Date(),
    countriesList: [],
    servicesAvailable: [],
    handleReturnDate: () => {},
    handleDepartureDate: () => {},
    handleToLocation: () => {},
    handleFromLocation: () => {},
    handleDropOffType: () => {},
    handleAdultsNumber: () => {},
    handleInfantsNumber: () => {},
    handleChildrenNumber: () => {},
});

const HotelTransferProvider: React.FC<HotelTransferProviderProps> = ({ children }) => {
    const currentDate = new Date();

    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [returnDate, setReturnDate] = React.useState<Date>(nextDay)
    const [currentUser, setCurrentUser] = React.useState<IUser>()
    const [departureDate, setDepartureDate] = React.useState<Date>(currentDate)
    const [toLocation, setToLocation] = React.useState<ILocation>()
    const [fromLocation, setFromLocation] = React.useState<ILocation>()
    const [countriesList, setCountriesList] = React.useState<ICountries[]>([])
    const [dropOffType, setDropOffType] = React.useState<DropOffTypes>('same')
    const [servicesAvailable, setServicesAvailable] = React.useState<IServicesAvailable[]>([])

    const [adultsNumber, setAdultsNumber] = React.useState<number>(2)
    const [infantsNumber, setInfantsNumber] = React.useState<number>(0)
    const [childrenNumber, setChildrenNumber] = React.useState<number>(0)

    const fetchServiceAvailable = async () => {
        const parameters = {
            toType: 'IATA',
            fromType: 'IATA',
            adults: adultsNumber,
            infants: infantsNumber,
            outbound: departureDate,
            children: childrenNumber,
            toCode: toLocation?.countryCode,
            fromCode: fromLocation?.countryCode,
            ...(dropOffType === 'same' && { inbound: returnDate }),
        }

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                body: JSON.stringify(parameters),
            })

            if (!response.ok) {
                throw new Error('Error al cargar la información del usuario');
            }

            const responseData = await response.json();

            setServicesAvailable(responseData)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchInformation = async (path: string) => {
        try {
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

            if (!countriesList) {
                const response = await fetchInformation('/api/locations/countries');

                setCountriesList(response);
            }

            setIsLoading(false)
        })()
    }, [])

    React.useEffect(() => {
        if (currentUser !== undefined) {
            if (!fromLocation) {
                const { homeLocation } = currentUser as IUser

                setFromLocation({
                    city: homeLocation.city,
                    country: homeLocation.country,
                    countryCode: homeLocation.countryCode
                })
            }
        }
    }, [currentUser])

    React.useEffect(() => {
        if (toLocation && fromLocation) {
            setIsLoading(true)

            fetchServiceAvailable().then(() => {
                setIsLoading(false)
            })
        }
    }, [returnDate, toLocation, fromLocation, departureDate])

    const handleAdultsNumber = (number: number) => setAdultsNumber(number)
    const handleInfantsNumber = (number: number) => setInfantsNumber(number)
    const handleChildrenNumber = (number: number) => setChildrenNumber(number)
    const handleReturnDate = (date: Date) => setReturnDate(date)
    const handleDepartureDate = (date: Date) => setDepartureDate(date)
    const handleToLocation = (location: ILocation) => setToLocation(location)
    const handleFromLocation = (location: ILocation) => setFromLocation(location)
    const handleDropOffType = (type: DropOffTypes) => setDropOffType(type)

    const memoizedValue = React.useMemo(() => {
        return {
            isLoading,
            currentUser,
            countriesList,
            fromLocation,
            servicesAvailable,
        };
    }, [isLoading, currentUser, countriesList, fromLocation, servicesAvailable]);

    return (
        <MyContext.Provider value={{
            ...memoizedValue,
            adultsNumber,
            infantsNumber,
            childrenNumber,
            returnDate,
            departureDate,
            handleAdultsNumber,
            handleInfantsNumber,
            handleChildrenNumber,
            handleToLocation,
            handleReturnDate,
            handleDropOffType,
            handleFromLocation,
            handleDepartureDate
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
