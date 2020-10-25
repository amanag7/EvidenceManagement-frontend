import axios from "axios";

import Transaction from "./transaction";
import Utils from "./utils";

// Urls
const URL = process.env.REACT_APP_REST_API_URL || "http://localhost:8008";
const BATCHES_URL = "/batches";
const BATCH_STATUS_URL = "/batch_statuses";
const STATE_URL = "/state";
const BLOCKS_URL = "/blocks";
const TRANSACTIONS_URL = "/transactions";
const STATUS_URL = "/status";
const PEERS_URL = "/peers";

// Requests
const submitPayloads = (keys, signer, payloads) => {
	const encodedBatch = Transaction.encodeAllPayloads(keys, signer, payloads);
	return axios
		.post(`${URL}${BATCHES_URL}`, encodedBatch, {
			headers: { "Content-Type": "application/octet-stream" },
		})
		.then((res) => res.data);
};

const getBatchStatus = (id) =>
	axios.get(`${URL}${BATCH_STATUS_URL}?id=${id}`).then((res) => res.data);

// States
const getStates = (prefix, start = null, limit = null, reverse = null) => {
	let url = `${URL}${STATE_URL}?address=${prefix}`;
	if (start) url = `${url}&start=${start}`;
	if (limit) url = `${url}&limit=${limit}`;
	if (reverse) url = `${url}&reverse=${reverse}`;
	return axios.get(url).then((res) => res.data);
};

const getState = (address) => {
	const type = Utils.getType(address);
	return axios
		.get(`${URL}${STATE_URL}/${address}`)
		.then((res) => Object.assign({ address, type }, Utils.decode(res)));
};

// Blocks
const getBlocks = (start = null, limit = null, reverse = null) => {
	let url = `${URL}${BLOCKS_URL}`;
	if (start) url = `${url}?start=${start}`;
	if (limit) url = `${url}${start ? "&" : "?"}limit=${limit}`;
	if (reverse) url = `${url}reverse=${reverse}`;
	return axios.get(url).then((res) => res.data);
};

const getBlock = (id) =>
	axios.get(`${URL}${BLOCKS_URL}/${id}`).then((res) => res.data);

// Transactions
const getTransactions = (start = null, limit = null, reverse = null) => {
	let url = `${URL}${TRANSACTIONS_URL}`;
	if (start) url = `${url}?start=${start}`;
	if (limit) url = `${url}${start ? "&" : "?"}&limit=${limit}`;
	if (reverse) url = `${url}&reverse=${reverse}`;
	return axios.get(url).then((res) => res.data);
};

const getTransaction = (id) =>
	axios.get(`${URL}${TRANSACTIONS_URL}/${id}`).then((res) => res.data);

// Status
const getStatus = () =>
	axios.get(`${URL}${STATUS_URL}`).then((res) => res.data);

const getPeers = () => axios.get(`${URL}${PEERS_URL}`).then((res) => res.data);

export default {
	submitPayloads,
	getBatchStatus,
	getStates,
	getState,
	getBlocks,
	getBlock,
	getTransactions,
	getTransaction,
	getStatus,
	getPeers,
};
