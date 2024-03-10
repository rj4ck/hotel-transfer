import React from 'react';
import { Input } from '@/assets/style';

interface IFilterDateProps {
	endDate: Date
	startDate: Date
	setEndDate: React.Dispatch<React.SetStateAction<Date>>
	setStartDate: React.Dispatch<React.SetStateAction<Date>>
}
const FilterDate: React.FC<IFilterDateProps> = ({ startDate, setStartDate, endDate, setEndDate }) => {

	const handleStartDateChange = (event: { target: { value: string | number | Date; }; }) => {
		setStartDate(new Date(event.target.value));
	};

	const handleEndDateChange = (event: { target: { value: string | number | Date; }; }) => {
		setEndDate(new Date(event.target.value));
	};

	const currentDate = new Date().toISOString().slice(0, 10);

	return (
		<div className="flex flex-row">
			<Input type="date"
				   id="startDate"
				   min={currentDate}
				   placeholder={'Fecha inicial'}
				   onChange={handleStartDateChange}
				   value={startDate.toISOString().slice(0, 10)}
			/>

			<Input type="date"
				   id="endDate"
				   min={currentDate}
				   placeholder={'Fecha inicial'}
				   onChange={handleEndDateChange}
				   value={endDate.toISOString().slice(0, 10)}
			/>
		</div>
	);
};

export default FilterDate;
