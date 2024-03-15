"use client";

import React from 'react';
import Dropdown from '@/app/components/Dropdown';
import InputNumber from '@/app/components/InputNumber';
import { useHotelTransfer } from "@/app/hooks/useTransfers";

interface TitleProps {
	totalPassengers?: string;
}

const Title: React.FC<TitleProps> = ({ totalPassengers = 0 }) => {

	return (
		<React.Fragment>
			<span className={'text-black dark:text-white font-bold'}>
				Passengers
			</span>

			<br/>

			<span className={'filter-description'}>
				{`${totalPassengers}`}
			</span>
		</React.Fragment>
	)
}
const GuestsInput: React.FC = () => {

	const {
		adultsNumber,
		infantsNumber,
		childrenNumber,
		handleAdultsNumber,
		handleChildrenNumber,
		handleInfantsNumber
	} = useHotelTransfer()

	const totalPassengers = `${adultsNumber} Adults, ${infantsNumber} Infants, ${childrenNumber} Children`

	return <Dropdown title={Title({ totalPassengers })}>
		<InputNumber
			min={1}
			max={10}
			label={'Adults'}
			defaultValue={adultsNumber}
			onChange={(value) => handleAdultsNumber(value)}/>

		<InputNumber
			label={'Infants'}
			defaultValue={infantsNumber}
			onChange={(value) => handleInfantsNumber(value)}/>

		<InputNumber
			label={'Children'}
			defaultValue={childrenNumber}
			onChange={(value) => handleChildrenNumber(value)}/>
	</Dropdown>;
};

export default GuestsInput;
