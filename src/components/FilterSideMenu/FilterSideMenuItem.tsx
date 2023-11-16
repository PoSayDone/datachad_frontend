import { Dispatch, SetStateAction } from 'react';

import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../Popover/Popover';
import style from './FilterSideMenu.module.scss';

type FilterSideMenuItemProps = {
	title: string;
	pickedItems: string[];
	canAdd: boolean;
	availableItems: string[];
	setPickedItems: Dispatch<SetStateAction<string[]>>;
	setAvailableItems: Dispatch<SetStateAction<string[]>>;
};

const FilterSideMenuItem = (props: FilterSideMenuItemProps) => {
	return (
		<div className={style.item}>
			<h4>{props.title}</h4>
			<div className={style.chips}>
				{props.pickedItems.map((label) => (
					<Chip
						key={label}
						color={''}
						closable={true}
						onClick={() => {
							props.setAvailableItems([
								...props.availableItems,
								props.pickedItems[props.pickedItems.indexOf(label)],
							]);
							props.setPickedItems(
								props.pickedItems.filter((item) => item !== label),
							);
						}}
					>
						{label}
					</Chip>
				))}
				{props.canAdd && (
					<div className={style.dropdown_container}>
						{props.availableItems.length !== 0 && (
							<Popover>
								<PopoverTrigger asChild={true}>
									<Chip>
										<span className='material-symbols-outlined'>add</span>
									</Chip>
								</PopoverTrigger>
								<PopoverContent>
									{props.availableItems.map((label) => (
										<PopoverClose
											className={style.popover_button}
											key={label}
											onClick={() => {
												props.setPickedItems([
													...props.pickedItems,
													props.availableItems[
														props.availableItems.indexOf(label)
													],
												]);
												props.setAvailableItems(
													props.availableItems.filter(
														(item) => item !== label,
													),
												);
											}}
										>
											{label}
										</PopoverClose>
									))}
								</PopoverContent>
							</Popover>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default FilterSideMenuItem;
