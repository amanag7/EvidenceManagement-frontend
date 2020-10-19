import axios from "axios";

import { encodeAllPayloads } from "./transactions";
import Utils from "./utils";

// Urls
const URL = process.env.REACT_APP_REST_API_URL || "http://localhost:4000";
const BATCHES_URL = "/batches";
const BATCH_STATUS_URL = "/batch_statuses";
const STATE_URL = "/state";
const BLOCKS_URL = "/blocks";
const TRANSACTIONS_URL = "/transactions";
const STATUS_URL = "/status";
const PEERS_URL = "/peers";

// Requests
const submitPayloads = (keys, signer, payloads) => {
	const encodedBatch = encodeAllPayloads(keys, signer, payloads);
	return axios
		.post(`${URL}${BATCHES_URL}`, encodedBatch, {
			headers: { "Content-Type": "application/octet-stream" },
		})
		.then((res) => res.data);
};
// TODO: Use Batch status api

// States
const getStates = (prefix, start = null, limit = null, reverse = null) => {
	let url = `${URL}${STATE_URL}?address=${prefix}`;
	if (!start) url = `${url}&start=${start}`;
	if (!limit) url = `${url}&limit=${limit}`;
	if (!reverse) url = `${url}&reverse=${reverse}`;
	return axios.get(url).then((res) => res.data);
};

const getState = (address) => {
	const type = Utils.getType(address);
	return axios
		.get(`${URL}${STATE_URL}/${address}`)
		.then((res) => Object.assign({ address, type }, Utils.decode(res)));
};

// Blocks
// TODO: Use Blocks api

// Transactions
// TODO: Use transactions api

// Status
const getStatus = () =>
	axios.get(`${URL}${STATUS_URL}`).then((res) => res.data);

const getPeers = () => axios.get(`${URL}${PEERS_URL}`).then((res) => res.data);

export default {
	submitPayloads,
	getStates,
	getState,
	getStatus,
	getPeers,
};
