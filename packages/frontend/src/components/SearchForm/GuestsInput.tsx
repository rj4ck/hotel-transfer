"use client";

import React from 'react';
import { Dropdown } from '@/assets/style';
import InputNumber from '@/components/InputNumber';
import ArrowDownIcon from '@/components/Icons/ArrowIcon';
import { Popover, Transition } from '@headlessui/react';

interface GuestsObject {
	guestAdults?: number;
	guestChildren?: number;
}
const GuestsInput = () => {
	const [guestAdultsInputValue, setGuestAdultsInputValue] = React.useState(2);
	const [guestChildrenInputValue, setGuestChildrenInputValue] = React.useState(1);

	const totalGuests = guestChildrenInputValue + guestAdultsInputValue;

	const handleChangeData = (value: number, type: keyof GuestsObject) => {
		let newValue = {
			guestAdults: guestAdultsInputValue,
			guestChildren: guestChildrenInputValue,
		};
		if (type === 'guestAdults') {
			setGuestAdultsInputValue(value);
			newValue.guestAdults = value;
		}
		if (type === 'guestChildren') {
			setGuestChildrenInputValue(value);
			newValue.guestChildren = value;
		}
	};

	return <Popover className={'flex flex-1 relative'}>
		{({ open }) => (
			<div className={'flex-1 z-10 flex items-center focus:outline-none'}>
				<Dropdown.Button>
					<Dropdown.Title>
						<span className="block xl:text-lg font-semibold">
							{totalGuests || ''} Guests
						</span>

						<Dropdown.Subtitle>
							{totalGuests ? "Guests" : "Add guests"}
						</Dropdown.Subtitle>
					</Dropdown.Title>

					<ArrowDownIcon direction={open ? 'up' : 'down'}/>

				</Dropdown.Button>

				{open && (
					<div
						className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
				)}

				<Transition
					as={React.Fragment}
					enter="transition ease-out duration-200"
					enterFrom="opacity-0 translate-y-1"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-in duration-150"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 translate-y-1"
				>
					<Dropdown.Body>
						<InputNumber
							min={1}
							max={10}
							label={'Adults'}
							defaultValue={guestAdultsInputValue}
							onChange={(value) => handleChangeData(value, 'guestAdults')}/>

						<InputNumber
							label={'Children'}
							defaultValue={guestChildrenInputValue}
							onChange={(value) => handleChangeData(value, 'guestChildren')}/>
					</Dropdown.Body>
				</Transition>
			</div>
		)}
	</Popover>;
};

export default GuestsInput;
