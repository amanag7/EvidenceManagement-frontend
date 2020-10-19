import { createContext, CryptoFactory } from "sawtooth-sdk/signing";
import { Secp256k1PrivateKey } from "sawtooth-sdk/signing/secp256k1";

import Utils from "./utils";

const KEY_NAME = process.env.REACT_APP_EMS_KEYS || "emsKeys";

// Public & Private keys related functions
const createKeys = () => {
	const context = createContext("secp256k1");
	const privateKey = context.newRandomPrivateKey();
	const publicKey = context.getPublicKey(privateKey).asHex();
	return { publicKey, privateKey: privateKey.asHex() };
};

const saveKeys = (keys) => localStorage.setItem(KEY_NAME, Utils.encode(keys));

const deleteKeys = () => localStorage.clear();

const getKeys = () => {
	const storedKeys = localStorage.getItem(KEY_NAME);
	if (!storedKeys) {
		const keys = createKeys();
		saveKeys(keys);
		return keys;
	}
	return Utils.decode(storedKeys);
};

// Signer related functions
const createSigner = (keys) => {
	const context = createContext("secp256k1");
	const privateKey = Secp256k1PrivateKey.fromHex(keys.privateKey);
	return new CryptoFactory(context).newSigner(privateKey);
};

const sign = (signer, header) => signer.sign(header);

export default {
	createKeys,
	getKeys,
	saveKeys,
	deleteKeys,
	createSigner,
	sign,
};
