import React from 'react';
import AutocompleteCombobox from "@/app/components/AutocompleteCombobox";
import { useHotelTransfer } from "@/app/hooks/useTransfers";
import countriesList from '@/jsonData/countries.json'
import tripTypesList from '@/jsonData/trip-types.json'
import GuestsInput from "@/app/components/SearchForm/GuestsInput";
import SearchButton from "@/app/components/SearchForm/SearchButton";
import DatePicker from "@/app/components/DatePickerInput";

const SearchForm = () => {
	const {
		isLoading,
		isLoadingHotels,
		isLoadingLocations,
		departureDate,
		returnDate,
		hotelsByCityList,
		citiesByCountryList,
		airportTerminalList,

		tripType,
		citySelected,
		hotelSelected,
		countrySelected,
		airportSelected,

		handleTripType,
		handleReturnDate,
		handleCitySelected,
		handleHotelSelected,
		handleDepartureDate,
		handleCountrySelected,
		handleAirportSelected,
		fetchServiceAvailable
	} = useHotelTransfer()

	const countriesOptions = countriesList.map(country => ({ value: country.code, label: country.name }));
	const airportTerminalsOptions = airportTerminalList
		? airportTerminalList.map(airport => ({
			value: airport.code,
			label: airport.content.description
		}))
		: [];

	const citiesOptions = citiesByCountryList
		? citiesByCountryList.map(city => ({
			value: city.code,
			label: city.name
		}))
		: [];

	const hotelsOptions = hotelsByCityList
		? hotelsByCityList.map(hotel => ({
			value: hotel.code,
			label: hotel.name
		}))
		: [];

	return <div className="h-screen text-white p-6">
		<AutocompleteCombobox label={'Type of trip'} value={tripType} options={tripTypesList} placeholder={'Trip'} onChange={handleTripType} isLoading={false} />

		<DatePicker date={departureDate} label={'Arrival date'} onChange={handleDepartureDate} />

		{tripType.value === 'round' && <DatePicker date={returnDate} label={'Return date'} onChange={handleReturnDate} />}

		<GuestsInput />

		<AutocompleteCombobox label={'Country'} value={countrySelected} options={countriesOptions} placeholder={'Country'} onChange={handleCountrySelected} isLoading={isLoading} />

		{countrySelected && <AutocompleteCombobox label={'Airport'} value={airportSelected} options={airportTerminalsOptions} placeholder={'Airport terminal'} onChange={handleAirportSelected} isLoading={isLoadingLocations} /> }

		{airportSelected && <AutocompleteCombobox label={'City'} value={citySelected} options={citiesOptions} placeholder={'City'} onChange={handleCitySelected} isLoading={isLoadingLocations} /> }

		{citySelected && <AutocompleteCombobox label={'Hotels'} value={hotelSelected} options={hotelsOptions} placeholder={'Hotel'} onChange={handleHotelSelected} isLoading={isLoadingHotels} /> }

		{hotelSelected && <SearchButton disabled={!hotelSelected} onClick={fetchServiceAvailable}/>}
	</div>
}

export default SearchForm
