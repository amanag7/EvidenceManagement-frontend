import React from "react";
import Title from "../components/Title";
import { Signing } from "../services";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			publicKey: "",
			privateKey: "",
		};

		this.handlePublicKeyChange = this.handlePublicKeyChange.bind(this);
		this.handlePrivateKeyChange = this.handlePrivateKeyChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handlePublicKeyChange(event) {
		this.setState({ publicKey: event.target.value });
	}

	handlePrivateKeyChange(event) {
		this.setState({ privateKey: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.privateKey !== "") {
			try {
				Signing.getKeys(this.state.privateKey);
				this.props.loginHandle();
			} catch (e) {
				// TODO: Handle exception
				console.log(e);
			}
		} else {
			// TODO: privatekey empty
		}
	}
	render() {
		return (
			<div className="tc pa3">
				<Title />
				<div className="dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025">
					<h1 className="mr2">Login details</h1>
					<br />
					<form onSubmit={this.handleSubmit}>
						<input
							className="pa2 ma3 br4"
							type="password"
							placeholder="Private Key"
							value={this.state.privateKey}
							onChange={this.handlePrivateKeyChange}
						/>
						<br />
						<input
							className="pa2 ma3 br2 bg-transparent grow"
							type="submit"
							value="Log in"
						/>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
