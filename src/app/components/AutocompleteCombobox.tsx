import { Combobox } from "@headlessui/react";
import ArrowDownIcon from "@/app/components/Icons/ArrowIcon";
import Transition from "@/app/components/Transition";
import React from "react";
import { IMenuOptions } from "@/entities";
import LoadingMessage from "@/app/components/LoadingMessage";

interface AutocompleteComboboxProp {
    label: string;
    isLoading?: boolean;
    placeholder: string;
    value?: IMenuOptions;
    options: IMenuOptions[];
    onChange: (selected: IMenuOptions | string) => void;
}

const AutocompleteCombobox: React.FC<AutocompleteComboboxProp> = ({ value, label, isLoading, placeholder, options, onChange }) => {
    const [query, setQuery] = React.useState('');

    const filteredData =
        query === ''
            ? options
            : options.filter((data) =>
                data.label
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    return <div className="popover-main">
        <Combobox value={value} onChange={onChange}>
            <div className="popover-button-wrapper">
                <span className={'text-black dark:text-white font-bold'}>
                    {label}
                </span>

                <br />

                {isLoading && <LoadingMessage />}

                {!isLoading && <Combobox.Button>
                    <div>
						<span className={'text-black dark:text-white font-thin'}>
							<Combobox.Input placeholder={placeholder} displayValue={({ label }) => label } onChange={(event) => setQuery(event.target.value)}/>
						</span>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ArrowDownIcon direction={'down'}/>
                    </div>
                </Combobox.Button>}

                <Transition>
                    <Combobox.Options className="popover-wrapper overflow-auto">
                        {filteredData.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredData.map((option, index) => (
                                <Combobox.Option
                                    key={`${index}-${option.value}`}
                                    className={({ active }) =>
                                        `popover-item overflow-auto ${
                                            active && 'bg-orange-500 text-white'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected, active }) => (
                                        <>
											<span className={`block truncate font-normal`}>
												{option.label}
											</span>

                                            {selected ? (
                                                <span
                                                    className={`${
                                                        active ? 'text-white' : 'text-orange-600'
                                                    }`}
                                                >
												</span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>
}

export default AutocompleteCombobox
