'use client';

import React from 'react';
import SearchForm from '@/app/components/SearchForm'
import BookingTransfer from "src/app/components/BookingTransfer";
import HotelTransferProvider from "@/app/hooks/useTransfers";

export default function Home() {

	return (
		<main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
			<HotelTransferProvider>
				<SearchForm />

				<BookingTransfer />
			</HotelTransferProvider>
		</main>
);
}
