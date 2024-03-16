'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import SearchForm from '@/app/components/SearchForm';
import HotelTransferProvider from "@/app/hooks/useTransfers";
import BookingTransfer from "src/app/components/BookingTransfer";
export default function Home() {

	return (
		<main>
			<ToastContainer position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover />

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
				<HotelTransferProvider>
					<SearchForm />

					<BookingTransfer />
				</HotelTransferProvider>
			</div>

		</main>
);
}
