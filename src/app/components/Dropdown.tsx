"use client";

import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import ArrowDownIcon from '@/app/components/Icons/ArrowIcon';

interface DropdownProps {
	label: string;
	className?: string;
	title: string | React.ReactNode
	children: string | React.ReactNode

}
const Dropdown: React.FC<DropdownProps> = ({ title, label, children, className }) => {
	return <Popover className={'popover-main'}>
		{({ open }) => (
			<div className={'popover-button-wrapper'}>
				<span className={'text-black dark:text-white font-bold'}>
                    {label}
                </span>

				<br/>

				<Popover.Button>
					<div className={'filter-resume'}>
						{title}
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2">
						<ArrowDownIcon direction={open ? 'up' : 'down'}/>
					</div>

				</Popover.Button>

				<Transition>
					<Popover.Panel className={`popover-panel-container ${className}`}>
						{children}
					</Popover.Panel>
				</Transition>
			</div>
		)}
	</Popover>;
};

export default Dropdown;
