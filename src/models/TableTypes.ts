export type FilterEntry = {
	id: string;
	value: string | string[] | Date[];
};

export type LogsTableEntry = {
	level: string;
	name: string;
	date: Date;
	project: string;
};
