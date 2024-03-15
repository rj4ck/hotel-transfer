import { Menu } from "@headlessui/react";
import ArrowDownIcon from "@/app/components/Icons/ArrowIcon";
import Transition from "@/app/components/Transition";
import React from "react";
import { IMenuOptions } from "@/entities";

interface IMenuListProps {
    value: string;
    options: IMenuOptions[];
    onChange: (value: string) => void
}
const MenuList: React.FC<IMenuListProps> = ({ value, options, onChange }) => {
    return <div className="drop-off-location">
        <Menu as="div">
            <div>
                <Menu.Button className={'dropdown'}>
                    {`Drop off: ${value} place`}
                    <ArrowDownIcon direction={'down'}/>
                </Menu.Button>
            </div>

            <Transition>
                <Menu.Items className="dropdown-options">

                    <div className="p-3">
                        {options.map((option) => (
                            <Menu.Item key={option.value}>

                                {({ active }) => (
                                    <button
                                        type={'button'}
                                        onClick={() => onChange(option.value)}
                                        className={`${
                                            active && 'bg-orange-500 text-white'
                                        }`}
                                    >
                                        {option.label}
                                    </button>

                                )}
                            </Menu.Item>
                        ))}

                    </div>

                </Menu.Items>
            </Transition>

        </Menu>
    </div>
}

export default MenuList
