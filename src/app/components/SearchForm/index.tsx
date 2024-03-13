import React from 'react';
import DropOffLocation from '@/app/components/SearchForm/DropOffLocation';
import { DropOffTypes } from '@/entities';
import LocationsInput from '@/app/components/SearchForm/LocationsInput';
import SearchButton from '@/app/components/SearchForm/SearchButton';
import Countries from "@/app/components/SearchForm/Countries";
import RangeDateInput from "@/app/components/SearchForm/RangeDateInput";

const SearchForm = () => {
	const [dropOffLocationType, setDropOffLocationType] = React.useState<DropOffTypes>("different")

	const handleDropOffType = (type: DropOffTypes) => {
		setDropOffLocationType(type)
	}

	return <div className={'search-form-wrapper'}>
		<form>
			<div className={'flex flex-row border-b border-neutral-700 justify-between'}>
				<DropOffLocation onChange={handleDropOffType} value={dropOffLocationType} />
				{/*<Countries  />*/}
			</div>

			<div className={'filters'}>
				<LocationsInput type={'pickup'} placeholder={'Pick up location'} />
				{dropOffLocationType === 'different' && (
					<React.Fragment>
						<LocationsInput type={'drop-off'} placeholder={'Drop off location'} />
					</React.Fragment>
				)}
				<RangeDateInput />

				<SearchButton />
			</div>
		</form>

	</div>
}

export default SearchForm
