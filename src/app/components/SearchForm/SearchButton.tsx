import React from "react";
import SearchIcon from '@/app/components/Icons/SearchIcon';

interface SearchButtonProps {
	onClick?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
	return (
		<div className="">
			<button
				onClick={onClick}
				type="submit"
				className="h-12 w-12 md:w-16 rounded-full bg-orange-500 hover:bg-orange-700 flex items-center justify-center text-neutral-50 focus:outline-none"
			>
				<SearchIcon />
			</button>
		</div>
	);
};

export default SearchButton;
