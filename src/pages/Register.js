import React from "react";
import Title from "../components/Title";
import Generated from "../components/Generated";
import { Signing, Payload, Requests } from "../services";

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
			isEmpty: false,
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
			this.setState({ isEmpty: false });
			const keys = Signing.getKeys();
			setKeys(keys);
			const signer = Signing.createSigner(keys);
			const payload = Payload.createPersonPayload(
				this.state.name,
				this.state.email
			);
			Requests.submitPayloads(keys, signer, payload)
				.then((data) => {
					const timer = setInterval(async () => {
						const res = await Requests.getBatchStatus(
							data.link
						);
						if (res.data[0].status === "COMMITTED") {
							clearInterval(timer);
							this.setState({ isSubmitted: true });
						} else if (res.data[0].status === "INVALID") {
							alert(
								res.data[0].invalid_transactions[0]
									.message
							);
							clearInterval(timer);
						}
					}, 5000);
				})
				.catch((e) => alert(e));
		} else {
			this.setState({ isEmpty: true });
		}
	}

	render() {
		return (
			<div className="tc pa3">
				<Title />
				{!this.state.isSubmitted && (
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
							{this.state.isEmpty && (
								<div>
									<p className="tc red">
										Please fill in the details
									</p>
								</div>
							)}
							<input
								className="pa2 ma3 br2 bg-transparent grow"
								type="submit"
								value="Generate Keys"
							/>
						</form>
					</div>
				)}
				{this.state.isSubmitted && (
					<div>
						<Generated
							publicKey={publicKey}
							privateKey={privateKey}
						/>
						<button
							className="f6 dim ph3 pv2 mh2 dib white bg-red ba b--black-025"
							onClick={(e) => this.props.loginHandle()}>
							Go To Evidences
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default Register;
