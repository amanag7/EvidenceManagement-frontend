import React, { useEffect, useState } from "react";
import { Requests, Utils } from "../services";

const EvidenceList = () => {
	const [list, setList] = useState([]);
	useEffect(() => {
		(async () => {
			const response = await Requests.getStates(
				`${Utils.NAMESPACE}${Utils.TYPE_PREFIXES.PERSON_PREFIX}`
			);
			setList(response.data);
		})();
	}, []);
	// TODO: Design list div
	return (
		<div>
			<h1>List of Evidences</h1>
			{list.map((e) => (
				<div key="{`${e.address}`}">{e.address}</div>
			))}
		</div>
	);
};

export default EvidenceList;
