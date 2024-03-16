import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import SearchIcon from "@/app/components/Icons/SearchIcon";
import { useHotelTransfer } from "@/app/hooks/useTransfers";
import LoadingMessage from "@/app/components/LoadingMessage";

interface IBookingDetailsProps {
    reference: string;
    onClick: () => void;
}

interface IDetailProps {
    label: string;
    value?: string | React.ReactNode;
}

interface IPriceAmountProp {
    amount?: number;
    currencyCode?: string;
}

const PriceAmount: React.FC<IPriceAmountProp> = ({ amount = 0, currencyCode = 'EUR' }) => {
    const userLanguage = navigator.language;

    const priceFormat = new Intl.NumberFormat(userLanguage, { style: 'currency', currency: currencyCode }).format(
        amount,
    )

    return <dd className="text-sm text-black dark:text-white">{priceFormat}</dd>
}

const Detail: React.FC<IDetailProps> = ({ label, value }) => {
    return (
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-black dark:text-white">{label}</dt>
            <dd className="sm:col-span-2 text-black dark:text-white">{value || ''}</dd>
        </div>
    )
}

const BookingDetails: React.FC<IBookingDetailsProps> = ({ onClick, reference }) => {

    const { bookingDetail, isLoadingBooking, handleCancelBooking } = useHotelTransfer();
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [loadingMessage, setLoadingMessage] = React.useState<string>("Search booking...")

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const handleCancel = () => {
        setLoadingMessage("Canceling booking...")
        handleCancelBooking(reference)
        closeModal()
    }

    React.useEffect(() => {
        if (!bookingDetail || isLoadingBooking) {
            openModal()
        }

        if (!bookingDetail && !isLoadingBooking) {
            closeModal()
        }

    }, [bookingDetail, isLoadingBooking])

    return (
        <>
            <span className={'text-white'}>
                <button disabled={!reference} type="button"
                        className="absolute inset-y-0 end-0 grid w-10 place-content-center bg-orange-600 disabled:opacity-50"
                        onClick={onClick}>
                    <SearchIcon/>
                </button>
            </span>

            <Transition appear show={isOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-40" onClose={closeModal}>
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">

                                        { isLoadingBooking && <LoadingMessage message={loadingMessage} /> }

                                        { bookingDetail && !isLoadingBooking && <div>
                                            <Dialog.Title as="h3"
                                                          className="mb-4 text-lg font-medium leading-6 text-black dark:text-white">
                                                Booking
                                            </Dialog.Title>

                                            <div className={'border-b border-neutral-300 mb-3'}/>

                                            <div className="flow-root">
                                                <dl className="-my-3 text-sm">

                                                    <Detail label={'Reference'} value={reference}/>
                                                    <Detail label={'Status'} value={bookingDetail?.status}/>
                                                    <Detail label={'Created'} value={bookingDetail?.creationDate}/>
                                                    <Detail label={'Name'}
                                                            value={`${bookingDetail?.holder?.name} ${bookingDetail?.holder?.surname}`}/>

                                                    <div className={'border-b border-[0.5] border-neutral-700'}/>

                                                    {/*<Detail label={'Vehicle'}
                                                            value={bookingDetail?.transfers[0].vehicle?.name}/>*/}
                                                    <Detail label={'Type'}
                                                            value={bookingDetail?.transfers[0].transferType}/>
                                                    <Detail label={'From'}
                                                            value={bookingDetail?.transfers[0].pickupInformation.from.description}/>
                                                    <Detail label={'To'}
                                                            value={bookingDetail?.transfers[0].pickupInformation.to.description}/>

                                                    <div className={'border-b border-[0.5] border-neutral-700'}/>

                                                    <Detail label={'Pending amount'}
                                                            value={PriceAmount({
                                                                amount: bookingDetail?.pendingAmount,
                                                                currencyCode: bookingDetail?.currency
                                                            })}/>
                                                </dl>
                                            </div>

                                            { bookingDetail.status === 'CONFIRMED' && <div>
                                                <div className={'border-b border-neutral-300 mt-3'}/>

                                                <div className="mt-4">
                                                    <button type="submit"
                                                            onClick={handleCancel}
                                                            className={'h-12 w-full rounded-md bg-red-500 hover:bg-red-700 flex items-center justify-center text-neutral-50 focus:outline-none'}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                            }
                                        </div>}

                                    </Dialog.Panel>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default BookingDetails
