import React from "react";
import formatDate from '@/utils/formatter-date'
import { useHotelTransfer } from "@/app/hooks/useTransfers";
import VehicleList from "@/app/components/BookingTransfer/VehicleList";
import LoadingMessage from "@/app/components/LoadingMessage";
import SearchIcon from "@/app/components/Icons/SearchIcon";

const RentCar = () => {
    const { isLoadingServices, departureDate, servicesAvailable } = useHotelTransfer()

    return <div className="main-container lg:col-span-2 bg-gray-200 p-8 divide-y-2 text-gray-400">

        <div className="relative mb-5">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                placeholder="Search booking reference"
                className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center bg-orange-600">
                <button type="button" className="text-white">
                    <SearchIcon />
                </button>
            </span>
        </div>

        <h2 className={'text-4xl font-semibold'}>{`Available services`}</h2>

        <div className={'block text-neutral-500 dark:text-neutral-400 mb-3'}>
            {`${formatDate(departureDate, '')}`}
        </div>

        {isLoadingServices && <LoadingMessage message={'Loading available services...'}/>}

        {!isLoadingServices && servicesAvailable?.length === 0 && <div className="grid grid-cols-1 gap-6 md:gap-8">
            Services no available
        </div>}

        {!isLoadingServices && servicesAvailable && servicesAvailable?.length > 0 &&
            <div className="grid grid-cols-3 gap-6 md:gap-8">
                {servicesAvailable && servicesAvailable?.map((service) => (
                    <VehicleList key={service.id} {...service} />
                ))}
            </div>}
    </div>
}

export default RentCar
