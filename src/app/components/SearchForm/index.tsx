import RangeDateInput from '@/app/components/SearchForm/RangeDateInput';
import { Divider } from '@/app/styles/style';
import GuestsInput from '@/app/components/SearchForm/GuestsInput';
import React from 'react';
import DropOffLocation from '@/app/components/SearchForm/DropOffLocation';
import { DropOffTypes } from '@/entities';
import LocationsInput from '@/app/components/SearchForm/LocationsInput';
import SearchButton from '@/app/components/SearchForm/SearchButton';

const SearchForm = () => {
	const [dropOffLocationType, setDropOffLocationType] = React.useState<DropOffTypes>("different")

	const handleDropOffType = (type: DropOffTypes) => {
		setDropOffLocationType(type)
	}

	React.useEffect(() => {
		const data = fetch('/api/countries')

		console.log(data)
	})

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
