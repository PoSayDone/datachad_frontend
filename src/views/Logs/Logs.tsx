import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import DateRangePicker from '../../components/DatePicker/DateRangePicker';
import FilterSideMenu from '../../components/FilterSideMenu/FilterSideMenu';
import FilterSideMenuItem from '../../components/FilterSideMenu/FilterSideMenuItem';
import LogsTable from '../../components/LogsTable/LogsTable';
import Search from '../../components/Search/Search';
import { FilterEntry } from '../../models/TableTypes';
import { subtractDays } from '../../utils/dateUtils';
import style from './Logs.module.scss';

const Logs: React.FC = () => {
	const [columnFilters, setColumnFilters] = useState<FilterEntry[]>([]);
	const logName = columnFilters.find((f) => f.id === 'name')?.value || '';

	const [pickedProjects, setPickedProjects] = useState<string[]>([]);
	const [availableProjects, setAvailableProjects] = useState<string[]>([
		'datachad',
		'smsenger',
		'ultratype',
	]);

	const [dateRange, setDateRange] = useState<DateRange>({
		from: subtractDays(new Date(), 1),
		to: new Date(),
	});

	useEffect(() => {
		onFilterChange('date', [dateRange.from, dateRange.to]);
	}, [dateRange]);

	useEffect(() => {
		setColumnFilters((prev) => {
			const statuses = prev.filter((filter) => filter.id !== 'project');
			return [...statuses, { id: 'project', value: pickedProjects }];
		});
	}, [pickedProjects]);

	const onFilterChange = (id: string, value: string | Date[]) =>
		setColumnFilters((prev) =>
			prev
				.filter((f) => f.id !== id)
				.concat({
					id,
					value,
				}),
		);

	return (
		<>
			<FilterSideMenu>
				<FilterSideMenuItem
					title={'Проекты'}
					pickedItems={pickedProjects}
					setPickedItems={setPickedProjects}
					canAdd={true}
					availableItems={availableProjects}
					setAvailableItems={setAvailableProjects}
				/>
			</FilterSideMenu>
			<div className={`container ${style.container}`}>
				<h1>Логи</h1>
				<div className={style.filter_container}>
					<Search
						placeholder='Найти логи'
						value={logName.toString()}
						onChange={(e: React.ChangeEvent<any>) =>
							onFilterChange('name', e.target.value)
						}
						className={style.search}
					/>
					<DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
				</div>
				<LogsTable columnFilters={columnFilters} />
			</div>
		</>
	);
};

export default Logs;
