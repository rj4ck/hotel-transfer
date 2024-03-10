import React from 'react';

interface InputNumberProps {
	min?: number;
	max?: number;
	label: string;
	className?: string;
	defaultValue?: number;
	onChange?: (value: number) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
	max,
	min = 0,
	label,
	defaultValue = 0,
	onChange = 0
}) => {
	const [value, setValue] = React.useState<number>(defaultValue);

	React.useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const handleDecrement = () => {
		if (min >= value) return;

		setValue((state) => {
			return state - 1;
		});

		onChange && onChange(value - 1);
	};
	const handleIncrement = () => {
		if (max && max <= value) return;

		setValue((state) => {
			return state + 1;
		});

		onChange && onChange(value + 1);
	};

	const renderLabel = () => {
		return (
			<div className="flex flex-col">
				<span className="font-medium text-neutral-800 dark:text-neutral-200">
					{label}
				</span>
			</div>
		);
	};

	return (
		<div className={`flex w-full items-center justify-between space-x-5`}>
			{label && renderLabel()}

			<div className={`flex items-center justify-between w-28`}>
				<button
					onClick={handleDecrement}
					disabled={min >= value}
					className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-orange-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
					type="button"
				>
					-
				</button>
				<span>{value}</span>
				<button
					onClick={handleIncrement}
					disabled={max ? max <= value : false}
					className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-orange-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
					type="button"
				>
					+
				</button>
			</div>
		</div>
	);
};

export default InputNumber;
