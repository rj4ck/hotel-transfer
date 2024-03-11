import React from 'react';
import { Combobox, Transition } from '@headlessui/react';
import ArrowDownIcon from '@/components/Icons/ArrowIcon';

interface LocationInputProps {
	placeholder: string;
}

const people = [
	{ id: 1, name: 'Wade Cooper' },
	{ id: 2, name: 'Arlene Mccoy' },
	{ id: 3, name: 'Devon Webb' },
	{ id: 4, name: 'Tom Cook' },
	{ id: 5, name: 'Tanya Fox' },
	{ id: 6, name: 'Hellen Schmidt' },
];
const LocationsInput: React.FC<LocationInputProps> = ({ description, placeholder }) => {

	const [selected, setSelected] = React.useState('');
	const [query, setQuery] = React.useState('');

	const filteredPeople =
		query === ''
			? people
			: people.filter((person) =>
				person.name
					.toLowerCase()
					.replace(/\s+/g, '')
					.includes(query.toLowerCase().replace(/\s+/g, ''))
			);

	return <div className="popover-main">
		<Combobox value={selected} onChange={setSelected}>
			<div className="popover-button-wrapper">
				<Combobox.Button>
					<div className={'filter-resume'}>
						<span className={'filter-title'}>
							<Combobox.Input placeholder={placeholder} displayValue={(person) => person.name}
											onChange={(event) => setQuery(event.target.value)}/>
						</span>
					</div>

					<div className="absolute inset-y-0 right-0 flex items-center pr-2">
						<ArrowDownIcon direction={'down'}/>
					</div>
				</Combobox.Button>

				<Transition
					as={React.Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
					afterLeave={() => setQuery('')}
				>
					<Combobox.Options
						className="popover-wrapper">
						{filteredPeople.length === 0 && query !== '' ? (
							<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
								Nothing found.
							</div>
						) : (
							filteredPeople.map((person) => (
								<Combobox.Option
									key={person.id}
									className={({ active }) =>
										`popover-item ${
											active && 'bg-orange-500 text-white'
										}`
									}
									value={person}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`block truncate ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{person.name}
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
	</div>;
};

export default LocationsInput;
