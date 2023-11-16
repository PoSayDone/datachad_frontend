import React, { useEffect, useRef } from 'react';

import style from './Radio.module.scss';

type OptionType = {
	value: string;
	title: string;
};

type OptionProps = {
	value: OptionType['value'];
	title: OptionType['title'];
	selected: OptionType['value'];
	groupName: string;
	onChange?: (value: string) => void;
};

const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange } = props;

	const optionRef = useRef<HTMLDivElement>(null);

	const handleChange = () => onChange?.(value);

	useEffect(() => {
		const option = optionRef.current;

		if (!option) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === option && event.key === 'Enter') {
				onChange?.(value);
			}
		};

		option.addEventListener('keydown', handleEnterKeyDown);

		return () => {
			option.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [value, onChange]);

	const inputId = `${groupName}_radio_item_with_value__${value}`;
	const isChecked = value === selected;
	console.log(value, selected);

	return (
		<div
			className={style.item}
			key={value}
			data-checked={isChecked}
			data-testid={inputId}
			tabIndex={0}
			ref={optionRef}
		>
			<input
				className={style.input}
				type='radio'
				name={groupName}
				id={inputId}
				value={value}
				onChange={handleChange}
				tabIndex={-1}
			/>
			<label className={style.label} htmlFor={inputId}>
				{title}
			</label>
		</div>
	);
};

type RadioGroupProps = {
	name: string;
	options: OptionType[];
	selected: OptionType['value'];
	onChange?: (value: string) => void;
};

const Radio = (props: RadioGroupProps) => {
	const { name, options, selected, onChange } = props;

	const handleChange = (value: string) => onChange?.(value);

	return (
		<div className={style.group}>
			{options.map(({ value, title }) => (
				<Option
					key={value}
					groupName={name}
					value={value}
					title={title}
					selected={selected}
					onChange={handleChange}
				/>
			))}
		</div>
	);
};

export default Radio;
