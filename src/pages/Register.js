import React from "react";
import Title from "../components/Title";
import Generated from "../components/Generated";
import { Signing, Payload, Requests } from "../services";
import { Link } from "react-router-dom";

let publicKey = "";
let privateKey = "";
const setKeys = (k) => {
	publicKey = k.publicKey;
	privateKey = k.privateKey;
};

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			isSubmitted: false,
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({ name: event.target.value });
	}

	handleEmailChange(event) {
		this.setState({ email: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.state.name !== "" && this.state.email !== "") {
			this.setState({ isSubmitted: true });
			const keys = Signing.getKeys();
			setKeys(keys);
			const signer = Signing.createSigner(keys);
			const payload = Payload.createPersonPayload(
				this.state.name,
				this.state.email
			);
			Requests.submitPayloads(keys, signer, payload)
				.then((data) =>
					Requests.getBatchStatus(data.link).then((res) => {
						// TODO: Handle batch status
						// res.data => {
						//  id: STRING,
						//  invalid_transactions: [ (Pick array's 0th element for displaying)
						//	 ...
						//	  {
						//      id: STRING,
						//      message: STRING
						//    }
						//	 ...
						//  ],
						//	status: STRING,
						// }
					})
				)
				.catch((e) => console.log(e));
		} else {
			// TODO: Show error if name or email is empty
			console.log("Empty");
		}
	}

	render() {
		return (
			<div className="tc pa3">
				<Title />
				<div className="dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025">
					<h1 className="mr2">Registration</h1>
					<br />
					<form onSubmit={this.handleSubmit}>
						<input
							className="pa2 ma3 br4"
							type="text"
							placeholder="Full Name"
							value={this.state.name}
							onChange={this.handleUsernameChange}
						/>
						<br />
						<input
							className="pa2 ma3 br4"
							type="email"
							placeholder="Email"
							value={this.state.email}
							onChange={this.handleEmailChange}
						/>
						<br />
						<input
							className="pa2 ma3 br2 bg-transparent grow"
							type="submit"
							value="Generate Keys"
						/>
					</form>
				</div>
				{this.state.isSubmitted && (
					<div>
						<Generated
							publicKey={publicKey}
							privateKey={privateKey}
						/>
						<Link className="link" to="/" exact>
							{" "}
							Login now{" "}
						</Link>
					</div>
				)}
			</div>
		);
	}
}

export default Register;
