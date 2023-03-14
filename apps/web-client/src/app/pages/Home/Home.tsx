import MeetingsManager from "./MeetingsManager/MeetingsManager";
import styles from "./Home.module.scss";
import { useEffect } from "react";
import { firestoreModels } from "@epicbrief/services";
import { useQueryClient } from "react-query";
import { Text } from "@chakra-ui/react";

export function Home() {
	const client = useQueryClient();
	useEffect(() => {
		const unsubscribe = firestoreModels.meetings.subscribe((data) => {
			client.invalidateQueries("meetings");
		});
		return unsubscribe;
	}, [client]);

	return (
		<div className={styles["container"]}>
			<Text fontSize="2xl" marginBottom={5}>
				Meetings
			</Text>
			<MeetingsManager />
		</div>
	);
}

export default Home;
