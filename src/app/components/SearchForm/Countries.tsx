import React from 'react';
import { Combobox } from '@headlessui/react';
import ArrowDownIcon from '@/app/components/Icons/ArrowIcon';
import { useHotelTransfer } from "@/app/hooks/useTransfers";
import { ICountries } from "@/dto/locations.dtos";
import Transition from "@/app/components/Transition";

interface LocationInputProps {
	type: 'pickup' | 'drop-off',
	placeholder: string;
}
const CountriesPicker: React.FC<LocationInputProps> = ({ type, placeholder }) => {

	const { isLoading, currentUser, countriesList } = useHotelTransfer()

	const [selected, setSelected] = React.useState(currentUser?.homeLocation.country);
	const [query, setQuery] = React.useState('');

	const filteredLocation =
		query === ''
			? countriesList
			: countriesList.filter((country) =>
				country.name
					.toLowerCase()
					.replace(/\s+/g, '')
					.includes(query.toLowerCase().replace(/\s+/g, ''))
			);

	return <div className="popover-main">
		{!isLoading && <Combobox value={selected} onChange={setSelected}>
			<div className="popover-button-wrapper">
				<Combobox.Button>
					<div className={'filter-resume'}>
						<span className={'filter-title'}>
							<Combobox.Input placeholder={'Country'}
											displayValue={(location: ICountries) => location.name}
											onChange={(event) => setQuery(event.target.value)} />
						</span>
					</div>

					<div className="absolute inset-y-0 right-0 flex items-center pr-2">
						<ArrowDownIcon direction={'down'}/>
					</div>
				</Combobox.Button>

				<Transition>
					<Combobox.Options className="popover-wrapper overflow-auto">
						{filteredLocation.length === 0 && query !== '' ? (
							<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
								Nothing found.
							</div>
						) : (
							filteredLocation.map((location) => (
								<Combobox.Option
									key={`${type}-${location.code}`}
									className={({ active }) =>
										`popover-item ${
											active && 'bg-orange-500 text-white'
										}`
									}
									value={location}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`block truncate ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{location.name}
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
		</Combobox>}
	</div>;
};

export default CountriesPicker;
