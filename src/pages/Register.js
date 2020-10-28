import React, { useState } from "react";
import { Signing, Payload, Requests, Utils } from "../services";

const register = (name, email) => {
	if (name !== "" && email !== "") {
		const keys = Signing.getKeys();
		// TODO: Display generated keys
		// keys => {
		//  publicKey: STRING,
		//  privateKey: STRING
		// }
		const signer = Signing.createSigner(keys);
		const payload = Payload.createPersonPayload(name, email);
		Requests.submitPayloads(keys, signer, payload)
			.then((data) => {
				Requests.getBatchStatus(data.link).then((res) => {
					console.log(res);
					// TODO: Handle batch status
					// res => {
					//  id: STRING,
					//  invalid_transactions: Array of STRINGs,
					//	status: STRING,
					// }
				});
			})
			.catch((e) => console.log(e));
	} else {
		console.log("Empty");
	}
};

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	return (
		<div>
			<h1>Register Page</h1>
			<div className="dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025">
				<h1 className="mr2">Login details</h1>
				<br />
				<input
					className="pa2 ma3 br4"
					type="text"
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<input
					className="pa2 ma3 br4"
					type="text"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<button
					className="pa2 ma3 br2 bg-transparent grow"
					type="submit"
					onClick={() => register(name, email)}>
					Log in
				</button>
			</div>
		</div>
	);
};

export default Register;
