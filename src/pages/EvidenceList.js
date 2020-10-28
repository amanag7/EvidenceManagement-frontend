import React, { useEffect, useState } from "react";
import { Requests, Utils } from "../services";

const EvidenceList = () => {
	const [list, setList] = useState([]);
	useEffect(() => {
		(async () => {
			const response = await Requests.getStates(
				`${Utils.NAMESPACE}${Utils.TYPE_PREFIXES.EVIDENCE_PREFIX}`
			);
			setList(response.data);
		})();
	}, []);
	return (
		<div>
			<h1>List of Evidences</h1>
			{list.length !== 0 ? (
				list.map((e) => <div key={e.address}>{e.address}</div>) //TODO: Design div
			) : (
				<div>No Evidences Found.</div> // TODO: Design not found div
			)}
		</div>
	);
};

export default EvidenceList;
