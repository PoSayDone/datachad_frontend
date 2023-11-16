import { faker } from '@faker-js/faker';

import { LogsTableEntry } from '../models/TableTypes';

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
const project = ['smsenger', 'ultratype', 'datachad'];

// функция генерации данных пользователя
function createLog(): LogsTableEntry {
	return {
		level: errorLevel[randInt(0, 2)],
		name: faker.animal.horse(),
		date: new Date(faker.date.anytime()),
		project: project[randInt(0, 2)],
	};
}

// функция генерации фиктивных данных в виде массива объектов пользователя заданной длины
const getLog = (len: number) => range(len).map(createLog);

export default getLog;
