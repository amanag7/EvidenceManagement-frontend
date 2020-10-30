import React from "react";
import Title from "../components/Title";
import { Signing } from "../services";
import { Link } from "react-router-dom";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			privateKey: "",
			isEmpty: false,
		};

		this.handlePrivateKeyChange = this.handlePrivateKeyChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handlePrivateKeyChange(event) {
		this.setState({ privateKey: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.privateKey !== "") {
			this.setState({ isEmpty: false });
			try {
				Signing.getKeys(this.state.privateKey);
				this.props.loginHandle();
			} catch (e) {
				alert("Private Key Invalid!");
				console.log(e);
			}
		} else {
			this.setState({isEmpty: true});
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
						{this.state.isEmpty && (
							<div>
								<p className=" tc red">Please enter the private key</p>
							</div>
						)}
						<input
							className="pa2 ma3 br2 bg-transparent grow"
							type="submit"
							value="Log in"
						/>
					</form>
				</div>
				<br />
				<Link
					to="/register"
					exact
					className="f6 link dim ph3 pv2 mh2 mt3 dib white bg-green">
					{" "}
					Click here to Register{" "}
				</Link>
			</div>
		);
	}
}

export default Login;
