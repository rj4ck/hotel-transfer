import React from "react";
import { useHotelTransfer } from "@/app/hooks/useTransfers";
import Cards from "@/app/components/Cards";
import VehicleList from "@/app/components/RentCar/VehicleList";

const RentCar = () => {
    const { fromLocation, servicesAvailable } = useHotelTransfer()
    return <div className={'px-12 mb-12 lg:mb-16'}>
        <h2 className={'text-4xl font-semibold'}>{`Drive around in ${fromLocation?.city}`}</h2>

        <div className={'block text-neutral-500 dark:text-neutral-400 mb-3'}>
            <span className="mx-2">·</span>
            Aug 12 - 18
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
            {servicesAvailable && servicesAvailable?.map((service) => (
                <VehicleList key={service.id} {...service} />
            ))}
        </div>
    </div>
}

export default RentCar
