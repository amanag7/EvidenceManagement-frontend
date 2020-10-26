import { createHash } from "crypto";

// Constants
const FAMILY_NAME =
	process.env.REACT_APP_FAMILY_NAME || "evidence_management_system";
const FAMILY_VERSION = process.env.REACT_APP_FAMILY_VERSION || "0.0";

const TYPES = {
	EVIDENCE: "EVIDENCE",
	PERSON: "PERSON",
};

const NAMESPACE_BASE_LENGTH = 6;
const NAMESPACE_OFFSET_LENGTH = 62;

const TYPE_PREFIXES = {
	EVIDENCE_PREFIX: "00",
	PERSON_PREFIX: "01",
};
// Encoding Decoding helpers
const encode = (obj) => Buffer.from(JSON.stringify(obj));

const decode = (buf) => JSON.parse(buf.toString());

const hash = (str, length = 128) =>
	createHash("sha512").update(str).digest("hex").slice(0, length);

// Addresses and Types
const NAMESPACE = hash(FAMILY_NAME, NAMESPACE_BASE_LENGTH);

const getEvidenceAddress = (key) =>
	`${NAMESPACE}${TYPE_PREFIXES.EVIDENCE_PREFIX}${hash(
		key,
		NAMESPACE_OFFSET_LENGTH
	)}`;

const getPersonAddress = (key) =>
	`${NAMESPACE}${TYPE_PREFIXES.PERSON_PREFIX}${hash(
		key,
		NAMESPACE_OFFSET_LENGTH
	)}`;

const getType = (address) =>
	address.slice(NAMESPACE_BASE_LENGTH + 1, NAMESPACE_BASE_LENGTH + 3) ===
	TYPE_PREFIXES.EVIDENCE_PREFIX
		? TYPES.EVIDENCE
		: TYPES.PERSON;

// Nonce - Random 1-12 chars long string
const getNonce = () => (Math.random() * 10 ** 18).toString(36);

export default {
	FAMILY_NAME,
	FAMILY_VERSION,
	NAMESPACE,
	TYPES,
	encode,
	decode,
	hash,
	getEvidenceAddress,
	getPersonAddress,
	getType,
	getNonce,
};
