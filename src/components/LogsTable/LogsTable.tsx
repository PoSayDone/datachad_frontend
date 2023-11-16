import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ReactNode, useState } from 'react';

import { FilterEntry, LogsTableEntry } from '../../models/TableTypes';
import getLog from '../../utils/getData';
import { filterDates, filterProjects } from '../../utils/tableFilters';
import Button from '../Button/Button';
import style from './LogsTable.module.scss';

type LogsTableProps = {
	columnFilters: FilterEntry[];
};

const columns: ColumnDef<LogsTableEntry>[] = [
	{
		header: 'уровень',
		accessorKey: 'level',
		cell: (props) => <p>{props.getValue() as ReactNode}</p>,
	},
	{
		header: 'имя',
		accessorKey: 'name',
		cell: (props) => <p>{props.getValue() as ReactNode}</p>,
		enableColumnFilter: true,
		filterFn: 'includesString',
	},
	{
		header: 'дата',
		accessorKey: 'date',
		filterFn: filterDates,
		cell: (props) => <p>{props.getValue()?.toLocaleString()}</p>,
	},
	{
		header: 'проект',
		accessorKey: 'project',
		cell: (props) => <p>{props.getValue() as ReactNode}</p>,
		enableColumnFilter: true,
		filterFn: filterProjects,
	},
];

const LogsTable = (props: LogsTableProps) => {
	const [data] = useState(getLog(1000));
	const columnFilters = props.columnFilters;

	const table = useReactTable({
		data,
		columns,
		state: {
			columnFilters,
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<>
			<table className={style.table}>
				<thead className={style.header}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className={style.row}>
							{headerGroup.headers.map((header) => {
								return (
									<th key={header.id} colSpan={header.colSpan}>
										<button
											className={style.cell}
											onClick={header.column.getToggleSortingHandler()}
										>
											<>
												{header.column.columnDef.header}
												{
													{
														false: (
															<span className='material-symbols-outlined'>
																swap_vert
															</span>
														),
														asc: (
															<span className='material-symbols-outlined'>
																arrow_drop_up
															</span>
														),
														desc: (
															<span className='material-symbols-outlined'>
																arrow_drop_down
															</span>
														),
													}[String(header.column.getIsSorted())]
												}
											</>
										</button>
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id} className={style.row}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td
											key={cell.id}
											className={`${style.cell}
								${
									cell.column.id === 'level'
										? {
												critical: style.critical,
												warning: style.warning,
												error: style.error,
										  }[String(cell.getValue())]
										: ''
								}`}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className={style.pagination_container}>
				<p className={style.pages}>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</p>
				<div className={style.pagination_buttons}>
					<Button
						variant='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='material-symbols-outlined'>navigate_before</span>
					</Button>
					<Button
						variant='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className='material-symbols-outlined'>navigate_next</span>
					</Button>
				</div>
			</div>
		</>
	);
};
export default LogsTable;
