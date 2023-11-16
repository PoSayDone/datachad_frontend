import { set } from 'date-fns';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';

import Button from '../../components/Button/Button';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/Popover/Popover';
import { subtractDays, subtractMonths, subtractYears } from '../../utils/dateUtils';
import style from './DatePicker.module.scss';

type Props = {
	dateRange: DateRange;
	setDateRange: Dispatch<SetStateAction<DateRange>>;
};

const DateRangePicker = ({ dateRange, setDateRange }: Props) => {
	useEffect(() => {
		// Load data from localStorage on page load
		const savedData = localStorage.getItem('daterange');
		if (savedData) {
			const savedDataObject = JSON.parse(savedData);
			savedDataObject.from = savedDataObject.from
				? new Date(savedDataObject.from)
				: undefined;
			savedDataObject.to = savedDataObject.to ? new Date(savedDataObject.to) : undefined;
			setDateRange(savedDataObject);
		} else {
			setDateRange({ from: new Date('0001-01-01T00:00:00Z'), to: new Date() });
		}
	}, []);

	const handleRangeSelect: SelectRangeEventHandler = (range: DateRange) => {
		const newDateRange = {
			from: range?.from,
			to: range?.to,
		};
		setDateRange(newDateRange);
		localStorage.setItem('daterange', JSON.stringify(newDateRange));
	};

	return (
		<Popover>
			<PopoverTrigger asChild={true}>
				<Button className={style.button}>
					с{' '}
					{dateRange?.from?.toLocaleDateString([], {
						year: '2-digit',
						month: '2-digit',
						day: '2-digit',
					}) || (
						<span className='material-symbols-outlined'>hourglass_disabled</span>
					)}{' '}
					по{' '}
					{dateRange?.to?.toLocaleDateString([], {
						year: '2-digit',
						month: '2-digit',
						day: '2-digit',
					}) || <span className='material-symbols-outlined'>hourglass_disabled</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<DayPicker
					mode='range'
					selected={dateRange}
					onSelect={handleRangeSelect}
					disabled={{ after: new Date() }}
					fixedWeeks
					showOutsideDays
				/>
				<button onClick={() => handleRangeSelect({ from: new Date(), to: new Date() })}>
					Cегодня
				</button>
				<button
					onClick={() =>
						handleRangeSelect({ from: subtractDays(new Date(), 7), to: new Date() })
					}
				>
					Неделя
				</button>
				<button
					onClick={() =>
						handleRangeSelect({ from: subtractMonths(new Date(), 1), to: new Date() })
					}
				>
					Месяц
				</button>
				<button
					onClick={() =>
						handleRangeSelect({ from: subtractYears(new Date(), 1), to: new Date() })
					}
				>
					Год
				</button>
				<button
					onClick={() =>
						handleRangeSelect({
							from: new Date('0001-01-01T00:00:00Z'),
							to: new Date(),
						})
					}
				>
					Всё время
				</button>
			</PopoverContent>
		</Popover>
	);
};

export default DateRangePicker;
