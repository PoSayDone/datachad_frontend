export function subtractDays(date: Date, days: number) {
	date.setDate(date.getDate() - days);
	return date;
}

export function subtractMonths(date: Date, months: number) {
	date.setMonth(date.getMonth() - months);
	return date;
}

export function subtractYears(date: Date, years: number) {
	date.setFullYear(date.getFullYear() - years);
	return date;
}
