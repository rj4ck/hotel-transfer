import React from "react";
import SearchIcon from '@/app/components/Icons/SearchIcon';

interface SearchButtonProps {
	disabled: boolean
	onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, disabled }) => {
	return (
		<div className="">
			<button
				type="submit"
				onClick={onClick}
				disabled={disabled}
				className="h-12 w-full rounded-full bg-orange-500 hover:bg-orange-700 flex items-center justify-center text-neutral-50 focus:outline-none"
			>
				<SearchIcon />
			</button>
		</div>
	);
};

export default SearchButton;
