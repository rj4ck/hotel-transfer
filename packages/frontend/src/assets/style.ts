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

export const SearchForm = {
	Wrapper: styled.form.attrs({
		className: `
		w-full 
		relative
		mt-8 
		flex
		rounded-md
		shadow-xl 
		bg-white 
		py-3 
		px-4 
		md:py-4 
		md:px-7 
		xl:py-6 
		xl:px-8
		dark:shadow-2xl 
		dark:bg-neutral-800`,
	})``,
};

export const Section = {
	Wrapper: styled.section.attrs({
		className: 'mb-12 lg:mb-16',
	})``,
	Heading: styled.h2.attrs({
		className: 'text-4xl font-semibold',
	})``,
	Subtitle: styled.span.attrs({
		className: 'block text-neutral-500 dark:text-neutral-400 mt-3',
	})``
};

export const Dropdown = {
	Button: styled(Popover.Button).attrs({
		className: `
		relative 
		py-3 
		px-4 
		md:py-4 
		md:px-7 
		xl:py-6 
		xl:px-8
		z-10 
		flex-1 
		flex 
		text-left 
		items-center 
		space-x-3 
		focus:outline-none`,
	})``,
	Title: styled.div.attrs({
		className: `flex-grow`
	})``,
	Subtitle: styled.span.attrs({
		className: `block mt-1 text-sm text-neutral-400 leading-none font-light`
	})``,
	Body: styled(Popover.Panel).attrs({
		className: `
		absolute 
		right-0 
		z-10 
		w-full 
		sm:min-w-[340px] 
		max-w-sm 
		bg-white 
		dark:bg-neutral-800 
		top-full 
		mt-5 
		p-4 
		sm:p-6 
		rounded-md 
		shadow-md`,
	})``,
};
