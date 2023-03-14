import { useQuery } from "react-query";
import { firestoreModels, firestoreModelTypes } from "@epicbrief/services";
import styles from "./MeetingsManager.module.scss";
import { Table } from "@epicbrief/shared-ui";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BsFilter } from "react-icons/bs";
import { RiSortDesc } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";

export function MeetingsManager() {
	const { data: meetings } = useQuery(["meetings"], () =>
		firestoreModels.meetings.getAll()
	);

	const columnHelper = useMemo(
		() => createColumnHelper<firestoreModelTypes.MeetingModel["schema"]>(),
		[]
	);

	const columns = useMemo(
		() => [
			columnHelper.accessor("title", {
				cell: (info) => info.getValue(),
				header: "Name",
			}),
			columnHelper.accessor("createdAt", {
				cell: (info) => info.getValue().toDate().toUTCString(),
				header: "Time",
			}),
			columnHelper.accessor("company.name", {
				cell: (info) => info.getValue(),
				header: "Account",
			}),
			columnHelper.accessor("nextSteps", {
				cell: (info) => info.getValue(),
				header: "Next steps",
			}),
		],
		[columnHelper]
	);

	return (
		<div className={styles["container"]}>
			<Flex justify="space-between" marginBottom={3}>
				<Stack direction="row" spacing={4}>
					<Button
						leftIcon={<BsFilter />}
						colorScheme="gray"
						variant="outline"
						bg="white"
						size="xs"
					>
						Filter
					</Button>
					<Button
						rightIcon={<ChevronDownIcon />}
						colorScheme="gray"
						variant="outline"
						size="xs"
						bg="white"
					>
						Actions
					</Button>
				</Stack>
				<Stack direction="row" spacing={4}>
					<Button
						leftIcon={<RiSortDesc />}
						colorScheme="gray"
						variant="outline"
						size="xs"
						bg="white"
					>
						Sort
					</Button>
					<Button
						rightIcon={<FiCalendar />}
						colorScheme="gray"
						variant="outline"
						size="xs"
						bg="white"
					>
						{new Date().toDateString()}
					</Button>
				</Stack>
			</Flex>
			{meetings && (
				<Table<firestoreModelTypes.MeetingModel["schema"]>
					isSelectable
					columns={columns}
					data={meetings}
				/>
			)}
		</div>
	);
}

export default MeetingsManager;
