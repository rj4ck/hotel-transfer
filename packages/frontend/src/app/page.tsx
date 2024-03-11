'use client';

import React from 'react';
import Image from 'next/image';
import { Divider, Section } from '@/styles/style';
import RangeDateInput from '@/components/SearchForm/RangeDateInput';
import GuestsInput from '@/components/SearchForm/GuestsInput';
import SearchButton from '@/components/SearchForm/SearchButton';
import useHotels from '@/lib/hooks/useHotels';
import Cards from '@/components/Cards';
import SearchForm from '@/components/SearchForm'

export default function Home() {

	const { fetchHotels } = useHotels();

	const [data] = React.useState([
		{ id: 2, title: 'Pruebas', seats: 4, price: 120, saleOff: true },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 3, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 1, title: 'Pruebas', seats: 4, price: 120 },
		{ id: 4,
			title: 'Shuttle',
			price: 19.37,
			gearshift: '',
			seats: 99 }
	]);

	React.useEffect(() => {
		console.log('RENDER!!!');
	}, []);

	const [dropOffLocationType] = React.useState('different')

	return (
		<main className="flex min-h-screen flex-col justify-between">
			<SearchForm />

			<Section.Wrapper>
				<Section.Heading>{'Drive around in Tegucigalpa'}</Section.Heading>

				<Section.Subtitle>
					233 stays
					<span className="mx-2">·</span>
					Aug 12 - 18
					<span className="mx-2">·</span>2 Guests
				</Section.Subtitle>

				<div className="grid grid-cols-1 gap-6 md:gap-8">
					{data.map((stay) => (
						<Cards key={stay.id} data={stay}/>
					))}
				</div>

				<div className="flex mt-16 justify-center items-center">
					{/*<Pagination/>*/}
				</div>

			</Section.Wrapper>

		</main>
	);
}
