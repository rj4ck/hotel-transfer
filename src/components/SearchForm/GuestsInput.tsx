"use client";

import React from 'react';
import Dropdown from '@/components/Dropdown';
import InputNumber from '@/components/InputNumber';

interface GuestsObject {
	guestAdults?: number;
	guestChildren?: number;
}

interface TitleProps {
	totalGuests?:  number;
}

const Title: React.FC<TitleProps> = ({ totalGuests = 0 }) => {

	return (
		<React.Fragment>
			<span className="filter-title">
				{totalGuests ?? ''} Guests
			</span>

			<span className={'filter-description'}>
				{totalGuests ? 'Guests' : 'Add guests'}
			</span>
		</React.Fragment>
	)
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

	return <Dropdown title={Title({ totalGuests })}>
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
	</Dropdown>;
};

export default GuestsInput;
