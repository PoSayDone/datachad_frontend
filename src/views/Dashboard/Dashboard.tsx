import 'react-day-picker/dist/style.css';

import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import Chart from '../../components/Chart/Chart';
import DateRangePicker from '../../components/DatePicker/DateRangePicker';
import Select from '../../components/Select/Select';
import { IChartEntry, ICombinedChartEntry, IViewType } from '../../models/ChartTypes';
import { subtractDays } from '../../utils/dateUtils';
import style from './Dashboard.module.scss';
import getDashboardEntry from './genData';

const UserData = getDashboardEntry(100);
const Dashboard = () => {
	const [data, setData] = useState<ICombinedChartEntry[]>();
	const [viewType, setViewType] = useState<IViewType>('hour');
	const [dateRange, setDateRange] = useState<DateRange>();

	function filterByDateRange(arr: IChartEntry[], fromDate?: Date, toDate?: Date) {
		return arr.filter((item) => {
			const timestamp = new Date(item.timestamp * 1000); // Convert Unix timestamp to JavaScript Date object
			return timestamp >= fromDate && timestamp <= toDate;
		});
	}

	function groupDataByViewType(arr: IChartEntry[], viewType: IViewType): ICombinedChartEntry[] {
		const groupedData: Map<string, number> = new Map();
		arr.forEach((item) => {
			const timestamp = new Date(item.timestamp * 1000);
			const key = getKeyFromDate(timestamp, viewType);

			if (groupedData.has(key)) {
				groupedData.set(key, groupedData.get(key)! + 1);
			} else {
				groupedData.set(key, 1);
			}
		});

		return Array.from(groupedData.entries()).map(([key, count]) => ({
			date: new Date(key),
			count,
		}));
	}

	function getKeyFromDate(
		date: Date,
		viewType: 'hour' | 'day' | 'week' | 'month' | 'year',
	): string {
		let key: string;

		switch (viewType) {
			case 'hour':
				key = date.toISOString().slice(0, 13) + ':00:00.000Z';
				break;
			case 'day':
				key = date.toISOString().slice(0, 10) + 'T00:00:00.000Z';
				break;
			case 'week':
				const weekStartDate = new Date(date);
				weekStartDate.setDate(date.getDate() - date.getDay());
				key = weekStartDate.toISOString().slice(0, 10) + 'T00:00:00.000Z';
				break;
			case 'month':
				key = date.toISOString().slice(0, 7) + '-01T00:00:00.000Z';
				break;
			case 'year':
				key = date.toISOString().slice(0, 4) + '-01-01T00:00:00.000Z';
				break;
			default:
				throw new Error('Invalid viewType');
		}

		return key;
	}

	useEffect(() => {
		setData(
			groupDataByViewType(
				filterByDateRange(UserData, dateRange?.from, dateRange?.to),
				viewType,
			),
		);
		console.log(
			groupDataByViewType(
				filterByDateRange(UserData, dateRange?.from, dateRange?.to),
				viewType,
			),
		);
	}, [UserData, dateRange, viewType]);

	return (
		<div className='container'>
			<h1>Дэшборд</h1>
			<div className={style.component}>
				<h2>Ошибки</h2>
				<div className={style.component_bar}>
					<DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
					<Select
						options={[
							{ value: 'hour', label: 'час' },
							{ value: 'day', label: 'день' },
							{ value: 'week', label: 'неделя' },
							{ value: 'month', label: 'месяц' },
							{ value: 'year', label: 'год' },
						]}
						value={viewType}
						onChange={setViewType}
						className={''}
					/>
				</div>
				<div className={style.chart}>
					<Chart viewType={viewType} dateRange={dateRange} data={data || []}></Chart>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
