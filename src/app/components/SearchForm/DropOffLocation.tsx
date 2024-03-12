import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import ArrowDownIcon from '@/app/components/Icons/ArrowIcon';
import { DropOffTypes } from '@/entities';

interface Options {
	label: string;
	value: DropOffTypes;
}

interface IDropOffLocationProps {
	value: DropOffTypes;
	onChange: (type: DropOffTypes) => void;
}

const DropOffLocation: React.FC<IDropOffLocationProps> = ({ value, onChange }) => {

	const OPTIONS: Options[] = [
		{ label: 'Same place', value: 'same' },
		{ label: 'Different place', value: 'different' },
	];

	return (
		<div className="drop-off-location">
			<Menu as="div">
				<div>
					<Menu.Button className={'dropdown'}>
						{`Drop off: ${value} place`}
						<ArrowDownIcon direction={'down'}/>
					</Menu.Button>
				</div>

				<Transition
					as={React.Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="dropdown-options">

						<div className="p-3">
							{OPTIONS.map((option: Options) => (
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
	);
};

export default DropOffLocation;
