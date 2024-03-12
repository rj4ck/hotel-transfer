"use client";

import React from 'react';
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Dropdown from '@/app/components/Dropdown';

interface GuestsObject {
	guestAdults?: number;
	guestChildren?: number;
}

interface TitleProps {
	endDate: null | Date;
	startDate: null | Date;
}
const Title: React.FC<TitleProps> = ({ startDate, endDate }) => {

	const formatDate = (date: null | Date, alterText: string) => {
		return date?.toLocaleDateString('EU', {
			month: 'short',
			day: '2-digit',
		}) || alterText
	}

	return (
		<span className="filter-title">
			{formatDate(startDate, 'Add dates')}
			{endDate && ` - ${formatDate(endDate, '')}`}
		</span>
	)
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

	return <Dropdown title={Title({ startDate, endDate })} className={'right-0'}>
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
	</Dropdown>;
};

export default GuestsInput;
