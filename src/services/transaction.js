import {
	Transaction,
	TransactionHeader,
	Batch,
	BatchHeader,
	BatchList,
} from "sawtooth-sdk/protobuf";

import Signing from "./signing";
import Utils from "./utils";

// Create Transaction
const createTransaction = (keys, signer, payload) => {
	const encodedPayload = Utils.encode(payload);

	const transactionHeaderBytes = TransactionHeader.encode({
		familyName: Utils.FAMILY_NAME,
		familyVersion: Utils.FAMILY_VERSION,
		inputs: [Utils.NAMESPACE],
		outputs: [Utils.NAMESPACE],
		signerPublicKey: keys.publicKey,
		batcherPublicKey: keys.publicKey,
		nonce: Utils.getNonce(),
		dependencies: [],
		payloadSha512: Utils.hash(encodedPayload),
	}).finish();

	const transaction = Transaction.create({
		header: transactionHeaderBytes,
		headerSignature: Signing.sign(signer, transactionHeaderBytes),
		payload: encodedPayload,
	});
	return transaction;
};

// Create Batch
const createBatch = (keys, signer, transactions) => {
	if (!Array.isArray(transactions)) transactions = [transactions];

	const batchHeaderBytes = BatchHeader.encode({
		signerPublicKey: keys.publicKey,
		transactionIds: transactions.map((tx) => tx.headerSignature),
	}).finish();

	const batch = Batch.create({
		header: batchHeaderBytes,
		headerSignature: Signing.sign(signer, batchHeaderBytes),
		transactions: transactions,
	});

	return batch;
};

// Create Encode Batches
const encodeBatches = (batches) => {
	if (!Array.isArray(batches)) batches = [batches];

	const batchList = BatchList.encode({ batches }).finish();

	return batchList.slice();
};

// Create Encoded Payloads
const encodeAllPayloads = (keys, signer, payloads) => {
	if (!Array.isArray(payloads)) payloads = [payloads];

	const transactionArray = payloads.map((pl) =>
		createTransaction(keys.privateKey, signer, pl)
	);

	return encodeBatches(
		createBatch(keys.privateKey, signer, transactionArray)
	);
};

export default {
	createTransaction,
	createBatch,
	encodeBatches,
	encodeAllPayloads,
};
