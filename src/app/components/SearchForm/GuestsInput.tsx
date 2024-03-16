"use client";

import React from 'react';
import Dropdown from '@/app/components/Dropdown';
import InputNumber from '@/app/components/InputNumber';
import { useHotelTransfer } from "@/app/hooks/useTransfers";

interface TitleProps {
	totalPassengers?: number;
}

const Title: React.FC<TitleProps> = ({ totalPassengers = 0 }) => {

	return (
		<span className={'filter-description text-right'}>
			{`${totalPassengers}`}
		</span>
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

	const totalPassengers = adultsNumber + infantsNumber + childrenNumber

	return <Dropdown label={'Passengers'} title={Title({ totalPassengers })}>
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
