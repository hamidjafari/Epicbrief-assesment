import styles from "./Table.module.scss";

import {
	Table as ChakraTable,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	HStack,
	Flex,
	Text,
	Checkbox,
} from "@chakra-ui/react";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	ColumnDef,
	SortingState,
	getSortedRowModel,
	getPaginationRowModel,
	createColumnHelper,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

export type TableProps<Data extends object> = {
	data: Data[];
	columns: ColumnDef<Data, any>[];
	isSelectable?: boolean;
};

export function Table<Data extends object>({
	data,
	columns,
	isSelectable = false,
}: TableProps<Data>) {
	const columnHelper = useMemo(() => createColumnHelper<Data>(), []);
	const [rowSelection, setRowSelection] = React.useState({});
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		columns: isSelectable
			? [
					columnHelper.accessor("id" as any, {
						header: ({ table }) => (
							<Checkbox
								checked={table.getIsAllRowsSelected()}
								isIndeterminate={table.getIsSomeRowsSelected()}
								onChange={table.getToggleAllRowsSelectedHandler()}
							/>
						),
						cell: ({ row }) => (
							<div className="px-1">
								<Checkbox
									checked={row.getIsSelected()}
									disabled={!row.getCanSelect()}
									isIndeterminate={row.getIsSomeSelected()}
									onChange={row.getToggleSelectedHandler()}
								/>
							</div>
						),
					}),
					...columns,
			  ]
			: columns,
		data,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
			rowSelection,
		},
	});

	return (
		<>
			<ChakraTable className={styles["Table"]}>
				<Thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<Tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const meta: any = header.column.columnDef.meta;
								return (
									<Th key={header.id} isNumeric={meta?.isNumeric}>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</Th>
								);
							})}
						</Tr>
					))}
				</Thead>
				<Tbody>
					{table.getRowModel().rows.map((row) => (
						<Tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								const meta: any = cell.column.columnDef.meta;
								return (
									<Td key={cell.id} isNumeric={meta?.isNumeric}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</ChakraTable>
			<Flex justify="space-between" flexGrow={1} marginTop={3}>
				<Text fontSize="sm">{`Showing ${
					table.getState().pagination.pageIndex *
						table.getState().pagination.pageSize +
					1
				} to ${
					table.getState().pagination.pageIndex *
						table.getState().pagination.pageSize +
					table.getRowModel().rows.length
				} of ${data.length}`}</Text>

				<HStack spacing="2">
					<Button
						size="sm"
						variant="outline"
						colorScheme="gray"
						className="border rounded p-1"
						onClick={() => table.previousPage()}
						isDisabled={!table.getCanPreviousPage()}
						bg="white"
					>
						{"Previous"}
					</Button>
					<Button
						size="sm"
						variant="outline"
						colorScheme="gray"
						className="border rounded p-1"
						onClick={() => table.nextPage()}
						isDisabled={!table.getCanNextPage()}
						bg="white"
					>
						{"Next"}
					</Button>
				</HStack>
			</Flex>
		</>
	);
}
