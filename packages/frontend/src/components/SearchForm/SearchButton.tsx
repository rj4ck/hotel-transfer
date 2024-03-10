import Link from "next/link";
import React from "react";
import SearchIcon from '@/components/Icons/SearchIcon';

interface SearchButtonProps {
	onClick?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
	return (
		<div className="">
			<button
				onClick={onClick}
				type="submit"
				className="h-full md:h-16 w-16 md:w-16 rounded-md bg-orange-900 hover:bg-orange-700 flex items-center justify-center text-neutral-50 focus:outline-none"
			>

				<SearchIcon />
			</button>
		</div>
	);
};

export default SearchButton;
