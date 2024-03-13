"use client";

import React, { useCallback } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Dropdown from '@/app/components/Dropdown';
import { useHotelTransfer } from "@/app/hooks/useTransfers";

interface TitleProps {
	returnDate: Date;
	departureDate: Date;
}

// eslint-disable-next-line react/display-name
const Title: React.FC<TitleProps> = React.memo(({ returnDate, departureDate }) => {
	const formatDate = useCallback((date: Date | null, alterText: string) => {
		return date ? date.toLocaleDateString('EU', {
			month: 'short',
			day: '2-digit',
		}) : alterText;
	}, []);

	return (
		<span className="filter-title">
            {formatDate(departureDate, 'Add dates')}
			{returnDate && ` - ${formatDate(returnDate, '')}`}
        </span>
	);
});

const GuestsInput: React.FC = () => {
	const { returnDate, departureDate, handleReturnDate, handleDepartureDate } = useHotelTransfer();

	const onChangeDate = useCallback((dates: [Date, Date]) => {
		const [start, end] = dates;
		handleReturnDate(end);
		handleDepartureDate(start);
	}, [handleReturnDate, handleDepartureDate]);

	return (
		<Dropdown title={<Title departureDate={departureDate} returnDate={returnDate} />} className={'right-0'}>
			<DatePicker
				selected={departureDate}
				onChange={onChangeDate}
				startDate={departureDate}
				endDate={returnDate}
				selectsRange
				monthsShown={2}
				showPopperArrow={false}
				inline
			/>
		</Dropdown>
	);
};

export default React.memo(GuestsInput);
