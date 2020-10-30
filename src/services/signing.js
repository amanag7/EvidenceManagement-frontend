import { createContext, CryptoFactory } from "sawtooth-sdk/signing";
import { Secp256k1PrivateKey } from "sawtooth-sdk/signing/secp256k1";

import Utils from "./utils";

const KEY_NAME = process.env.REACT_APP_EMS_KEYS || "emsKeys";

// Public & Private keys related functions
const verifyKeys = (privateKey) => Secp256k1PrivateKey.fromHex(privateKey);

const createKeys = (privateKey = null) => {
	const context = createContext("secp256k1");
	const privateKeyBuffer = privateKey
		? verifyKeys(privateKey)
		: context.newRandomPrivateKey();
	const publicKey = context.getPublicKey(privateKeyBuffer).asHex();
	return { publicKey, privateKey: privateKeyBuffer.asHex() };
};

const saveKeys = (keys) => localStorage.setItem(KEY_NAME, Utils.encode(keys));

const checkKeys = () => (localStorage.getItem(KEY_NAME) ? true : false);

const deleteKeys = () => localStorage.clear();

const getKeys = (privateKey = null) => {
	const storedKeys = localStorage.getItem(KEY_NAME);
	if (!storedKeys) {
		const keys = createKeys(privateKey);
		saveKeys(keys);
		return keys;
	}
	return Utils.decode(storedKeys);
};

// Signer related functions
const createSigner = (keys) => {
	const context = createContext("secp256k1");
	const privateKey = verifyKeys(keys.privateKey);
	return new CryptoFactory(context).newSigner(privateKey);
};

const sign = (signer, header) => signer.sign(header);

export default {
	verifyKeys,
	checkKeys,
	createKeys,
	getKeys,
	saveKeys,
	deleteKeys,
	createSigner,
	sign,
};
