'use client';

import React from 'react';
import { Section } from '@/app/styles/style';
import Cards from '@/app/components/Cards';
import SearchForm from '@/app/components/SearchForm'
import RentCar from "@/app/components/RentCar";
import HotelTransferProvider, { useHotelTransfer } from "@/app/hooks/useTransfers";

export default function Home() {
	const { fromLocation, servicesAvailable } = useHotelTransfer()

	const [dropOffLocationType] = React.useState('different')

	React.useCallback(() => {
		console.log('HOLA')
	}, [])

	return (
		<main className="flex min-h-screen flex-col justify-between">
			<HotelTransferProvider>
				<SearchForm/>

				<RentCar />
			</HotelTransferProvider>

			<Section.Wrapper>

				<div className="flex mt-16 justify-center items-center">
					{/*<Pagination/>*/}
				</div>

			</Section.Wrapper>

		</main>
	);
}
