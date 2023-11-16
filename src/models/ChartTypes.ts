export interface ICombinedChartEntry {
	date: Date;
	count: number;
}

export interface IChartEntry {
	timestamp: number;
	level: string;
}

export type IViewType = 'hour' | 'day' | 'week' | 'month' | 'year';
