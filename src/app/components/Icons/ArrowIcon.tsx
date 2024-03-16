import React from 'react';

interface ArrowIconProps {
	direction: 'up' | 'down' | 'left' | 'right';
}
const ArrowIcon: React.FC<ArrowIconProps> = ({ direction }) => {
	const getArrowDirection = () => {
		switch (direction) {
		case 'up':
			return 'rotate-180';
		case 'down':
			return 'rotate-0';
		case 'left':
			return 'rotate-90';
		case 'right':
			return 'rotate-270';
		default:
			return '';
		}
	};

	return <svg className={`w-2.5 h-2.5 ms-2.5 transform ${getArrowDirection()}`} aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg" fill="none"
				viewBox="0 0 10 6">
		<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
			  d="m1 1 4 4 4-4"/>
	</svg>;
};

export default ArrowIcon;
