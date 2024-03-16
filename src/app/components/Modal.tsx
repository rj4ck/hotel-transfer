import { Dialog, Transition } from "@headlessui/react";
import React, { ReactNode } from "react";

interface IModalDialogProps {
    className: string;
    children: ReactNode;
    submitButton: string;
    title: React.ReactNode | string;
}
const ModalDialog: React.FC<IModalDialogProps> = ({ title, children, className, submitButton }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button type="button" onClick={openModal} className={className}>
                {title}
            </button>

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
                                        <Dialog.Title as="h3" className="mb-4 text-lg font-medium leading-6 text-black dark:text-white">
                                            {title}
                                        </Dialog.Title>

                                        <div className={'border-b border-neutral-700'}/>

                                        {children}

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

export default ModalDialog
