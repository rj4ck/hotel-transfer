import React from 'react';
import Image from 'next/image'
import { IServicesAvailable } from "@/dto/services-available.dto";

interface ICardProps {
	data: IServicesAvailable
}

interface CardImageProps {
	image: string;
}
const CardImage: React.FC<CardImageProps> = ({ image }) => {
	return <div className="w-1/4">
		<div className="aspect-w-16 aspect-h-9 ">
			<Image

				src={image}
				alt="car"
				width={200}
				height={200}

			/>
		</div>
	</div>
}
const Cards: React.FC<ICardProps> = ({ data }) => {
	const { minPaxCapacity, maxPaxCapacity, price, content, vehicle, category } = data;

	const formatDate = React.useCallback((date: Date | null, alterText: string) => {
		if (typeof navigator !== 'undefined' && navigator.language) {
			return date ? date.toLocaleDateString(navigator.language, {
				month: 'short',
				day: '2-digit',
			}) : alterText;
		} else {
			return alterText;
		}
	}, []);

	return (
		<div className="cards">
			<div className={'p-5 flex flex-row'}>
				<CardImage image={content.images[1].url} />

				<div className="px-5 w-full">
					<div>
						<div className="flex items-center space-x-2">
							<h2 className={`capitalize text-xl font-semibold`}>
								<span className="line-clamp-1">{vehicle.name}</span>
							</h2>
						</div>

						<div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
							<span className="">
								{category.name}
							</span>

						</div>

						<div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">

							{`${minPaxCapacity} - ${maxPaxCapacity} Seats`}

						</div>
					</div>

					<div className="w-14  border-b border-neutral-100 dark:border-neutral-800"></div>

					<div className="flex justify-between items-center">
				<span className="text-base font-semibold">
					<span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">/day</span>
				</span>
					</div>
				</div>
			</div>

			<div className="relative w-full rounded-2xl overflow-hidden">
				<div className="aspect-w-16 aspect-h-9 ">
				</div>
			</div>
		</div>
	)
}

export default Cards
