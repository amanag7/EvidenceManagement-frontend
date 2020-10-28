import React from "react";
import { Requests, Utils } from "../services";

const decodeEvidence = (data) => {
	const item = Utils.decodeBase64(data);
	// TODO: Get file from IPFS from item.cid
};
const EvidenceDetails = () => {
	return (
		<div>
			<h1>Details of an Evidence</h1>
		</div>
	);
};

export default EvidenceDetails;
