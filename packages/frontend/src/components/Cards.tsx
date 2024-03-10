import React from 'react';

interface ICardProps {
	data: any
}
const Cards: React.FC<ICardProps> = ({ data }) => {
	const { price, title, seats, gearshift, saleOff } = data

	return (
		<div
			className="group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900">
			<div className={"p-5  space-y-4"}>
				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						<h2 className={`  capitalize text-xl font-semibold`}>
							<span className="line-clamp-1">{title}</span>
						</h2>
					</div>

					<div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
						<span className="">{seats} seats</span>
						<span>-</span>
						<span className="">{gearshift} </span>
					</div>
				</div>

				<div className="w-14  border-b border-neutral-100 dark:border-neutral-800"></div>

				<div className="flex justify-between items-center">
				<span className="text-base font-semibold">
					{price}{` `}
					<span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">/day</span>
				</span>
				</div>
			</div>

			<div className="relative w-full rounded-2xl overflow-hidden">
				<div className="aspect-w-16 aspect-h-9 ">
				</div>

				{saleOff &&
					<div
						className={` flex items-center justify-center text-xs py-0.5 px-3 bg-red-700 text-red-50 rounded-full absolute left-3 top-3`}
						data-nc-id="SaleOffBadge">
						{"-10%"}
					</div>

				}
			</div>
		</div>
	)
}

export default Cards
