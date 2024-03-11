import styled from 'styled-components';
import { Popover, Transition } from "@headlessui/react";

export const Input = styled.input.attrs({
	className: `
	block 
	py-2.5 
	px-4 
	w-full 
	z-10
	text-sm 
	text-gray-900 
	bg-gray-50  
	border 
	border-gray-300 
	dark:bg-gray-700 
	dark:hover:bg-gray-600 
	dark:focus:ring-gray-700 
	dark:text-white 
	dark:border-gray-600`,
})``;

export const Divider = styled.div.attrs({
	className: `self-center border-r border-slate-200 dark:border-slate-700 h-8`,
})``;

export const Section = {
	Wrapper: styled.section.attrs({
		className: 'px-12 mb-12 lg:mb-16',
	})``,
	Heading: styled.h2.attrs({
		className: 'text-4xl font-semibold',
	})``,
	Subtitle: styled.span.attrs({
		className: 'block text-neutral-500 dark:text-neutral-400 mb-3',
	})``
};
