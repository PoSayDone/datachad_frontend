import { faker } from '@faker-js/faker';

import { IChartEntry } from '../../models/ChartTypes';
import { subtractYears } from '../../utils/dateUtils';

// функция генерации массива чисел от 0 до `len`
const range = (len: number) => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

// функция, возвращающая случайное целое число в заданном диапазоне
const randInt = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1));

const errorLevel = ['warning', 'critical', 'error'];

// функция генерации данных пользователя
function createDashboardEntry(): IChartEntry {
	return {
		timestamp:
			faker.date
				.between({
					from: subtractYears(new Date(), 1),
					to: new Date(),
				})
				.getTime() / 1000,
		level: errorLevel[randInt(0, 2)],
	};
}

// функция генерации фиктивных данных в виде массива объектов пользователя заданной длины
const getDashboardEntry = (len: number) => range(len).map(createDashboardEntry);

export default getDashboardEntry;
