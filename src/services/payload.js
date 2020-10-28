const createEvidencePayload = (cid, title, mimeType) => {
	return {
		action: "CREATE_EVIDENCE",
		timestamp: Date.now(),
		data: {
			cid,
			title,
			mimeType,
		},
	};
};
const createPersonPayload = (name, email) => {
	return {
		action: "CREATE_PERSON",
		timestamp: Date.now(),
		data: {
			name,
			email,
		},
	};
};

export default {
	createEvidencePayload,
	createPersonPayload,
};
