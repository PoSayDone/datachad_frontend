import 'chartjs-adapter-date-fns';

import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	PointElement,
	TimeScale,
	Title,
	Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DateRange } from 'react-day-picker';

import { ICombinedChartEntry, IViewType } from '../../models/ChartTypes';
import style from './Chart.module.scss';

type Props = {
	dateRange: DateRange;
	viewType: IViewType;
	data: ICombinedChartEntry[];
};

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	TimeScale,
	Title,
	Tooltip,
	Legend,
	Filler,
);

const Chart = (props: Props) => {
	console.log(props.data);

	const data = {
		datasets: [
			{
				label: 'Errors',
				data: props.data,
				backgroundColor: '#F58989',
				borderColor: '#F58989',
				borderRadius: 10,
			},
		],
	};

	ChartJS.defaults.font.family = 'JetBrains Mono';
	ChartJS.defaults.font.size = 16;

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
		},
		parsing: {
			xAxisKey: 'date',
			yAxisKey: 'count',
		},
		scales: {
			x: {
				type: 'time',
				time: {
					unit: props.viewType,
				},
			},
			y: {
				beginAtZero: true,
				suggestedMax: 10,
			},
		},
		elements: {
			line: {
				borderWidth: 5,
				borderColor: 'rgba(246,147,147,1)',
			},
			point: {
				pointRaidus: 10,
				pointColor: 'rgba(246,147,147,1)',
			},
		},
	};

	return <Bar className={style.chart} data={data} options={options} />;
};

export default Chart;
