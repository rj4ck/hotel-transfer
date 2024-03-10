"use client";

import React from 'react';
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { Dropdown } from '@/assets/style';
import ArrowDownIcon from '@/components/Icons/ArrowIcon';
import { Popover, Transition } from '@headlessui/react';

interface GuestsObject {
	guestAdults?: number;
	guestChildren?: number;
}
const GuestsInput = () => {
	const [startDate, setStartDate] = React.useState<Date | null>(
		moment().toDate()
	);
	const [endDate, setEndDate] = React.useState<Date | null>(moment().add(1, 'days').toDate());

	const onChangeDate = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	return <Popover className={'flex flex-1 relative'}>
		{({ open }) => (
			<div className={'flex-1 z-10 flex items-center focus:outline-none'}>
				<Dropdown.Button>
					<Dropdown.Title>
						<span className="block xl:text-lg font-semibold">
								{startDate?.toLocaleDateString('en-US', {
									month: 'short',
									day: '2-digit',
								}) || 'Add dates'}
							{endDate ? ' - ' + endDate?.toLocaleDateString('en-US', {
								month: 'short',
								day: '2-digit',
							}) : ''}
						</span>

						<Dropdown.Subtitle>
							{'Check in - Check out'}
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
						<div
							className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
							<DatePicker
								selected={startDate}
								onChange={onChangeDate}
								startDate={startDate}
								endDate={endDate}
								selectsRange
								monthsShown={2}
								showPopperArrow={false}
								inline
							/>
						</div>
					</Dropdown.Body>
				</Transition>
			</div>
		)}
	</Popover>;
};

export default GuestsInput;
