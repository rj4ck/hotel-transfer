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

	return (
		<>
			<span className={'m-4 text-black dark:text-white font-bold'}>
                    {label}
                </span>

			<br/>

			<Dropdown title={<Title date={date}/>} className={'right-0'}>
				<DatePicker selected={date} onChange={onChange} inline/>
			</Dropdown>
		</>
);
};

export default React.memo(DatePickerInput);
