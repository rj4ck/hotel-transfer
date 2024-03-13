import React from "react";
import { IServicesAvailable } from "@/dto/services-available.dtos";

interface IPriceAmountProp {
    amount: number;
    currencyCode: string;
}

const PriceAmount: React.FC<IPriceAmountProp> = ({ amount, currencyCode }) => {
    const userLanguage = navigator.language;

    const priceFormat = new Intl.NumberFormat(userLanguage, { style: 'currency', currency: currencyCode }).format(
        amount,
    )

    return <dd className="text-sm text-gray-500">{priceFormat}</dd>
}
const Vehicle: React.FC<IServicesAvailable> = ({ price, category, vehicle, content, transferType, minPaxCapacity, maxPaxCapacity  }) => {

    return (
        <div className="cards">
            <img
                alt=""
                src={content.images[0].url}
                className="h-56 w-full rounded-md object-contain"
            />

            <div className="mt-2">
                <dl>
                    <div>
                        <dt className="sr-only">Price</dt>
                        <PriceAmount amount={price.totalAmount} currencyCode={price.currencyId} />

                    </div>

                    <div>
                        <dt className="sr-only">Address</dt>

                        <dd className="font-medium">{`${vehicle.name} - ${category.name}`}</dd>
                    </div>
                </dl>

                <div className="mt-6 flex items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Type</p>

                            <p className="font-medium">{transferType}</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">

                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Seats</p>

                            <p className="font-medium">{`${minPaxCapacity} - ${maxPaxCapacity}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vehicle
