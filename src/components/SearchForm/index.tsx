import RangeDateInput from '@/components/SearchForm/RangeDateInput';
import { Divider } from '@/styles/style';
import GuestsInput from '@/components/SearchForm/GuestsInput';
import React from 'react';
import DropOffLocation from '@/components/SearchForm/DropOffLocation';
import { DropOffTypes } from '@/entities';
import LocationsInput from '@/components/SearchForm/LocationsInput';
import SearchButton from '@/components/SearchForm/SearchButton';

const SearchForm = () => {
	const [dropOffLocationType, setDropOffLocationType] = React.useState<DropOffTypes>("different")

	const handleDropOffType = (type: DropOffTypes) => {
		setDropOffLocationType(type)
	}

	return <div className={'search-form-wrapper'}>
		<form>
			<DropOffLocation onChange={handleDropOffType} value={dropOffLocationType} />

			<div className={'filters'}>
				<LocationsInput placeholder={'Pick up location'} />
				{dropOffLocationType === 'different' && (
					<React.Fragment>
						<LocationsInput placeholder={'Drop off location'} />
					</React.Fragment>
				)}
				{/*<RangeDateInput />*/}
				<RangeDateInput />

				<SearchButton />
			</div>
		</form>

	</div>
}

export default SearchForm
