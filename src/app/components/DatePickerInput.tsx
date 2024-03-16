"use client";

import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import formatDate from '@/utils/formatter-date'
import Dropdown from '@/app/components/Dropdown';

interface TitleProps {
	date: Date;
}

const Title: React.FC<TitleProps> = (({ date }) => {

	return (
		<span className="filter-title">
            {formatDate(date, 'Add dates')}
        </span>
	);
});

interface IDatePickerProp {
	date: Date,
	label: string,
	onChange: (date: Date) => void
}

const DatePickerInput: React.FC<IDatePickerProp> = ({ date, label, onChange }) => {
	const currentDate = new Date();
	const minimumSelectableDate = new Date(currentDate);
	minimumSelectableDate.setDate(currentDate.getDate() + 1);

	return (
		<Dropdown label={label} title={<Title date={date} />}>
			<DatePicker selected={date} onChange={onChange} inline minDate={minimumSelectableDate}/>
		</Dropdown>
);
};

export default React.memo(DatePickerInput);
