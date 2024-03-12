import React from "react";
import { ICountries } from "@/dto/countries.dtos";

export default () => {
    const [countriesList, setCountriesList] = React.useState<ICountries[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        (async() => {
            setIsLoading(true)

            try {
                const response = await fetch('/api/countries');

                const responseData = await response.json();

                setCountriesList(responseData);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    const memoizedValue = React.useMemo(() => {
        return {
            isLoading,
            countriesList,
        };
    }, [isLoading, countriesList]);

    return {
        ...memoizedValue,
    };
}
