export const filterProjects: FilterFn<any> = (row, columnId, filterValues: string[]) => {
	const project: string = row.getValue(columnId);
	if (filterValues.length === 0) return true;
	return filterValues.includes(project);
};

export const filterDates: FilterFn<any> = (row, columnId, value) => {
	const date = row.getValue(columnId);
	const [start, end] = value; // value => two date input values
	//If one filter defined and date is null filter it
	if ((start || end) && !date) return false;
	if (start && !end) {
		return date.getTime() >= start.getTime();
	} else if (!start && end) {
		return date.getTime() <= end.getTime();
	} else if (start && end) {
		return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
	} else return true;
};
