import React from "react";
import "tachyons";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EvidenceList from "./pages/EvidenceList";
import CreateEvidence from "./pages/CreateEvidence";
import { Route, Link, Redirect } from "react-router-dom";
import { Signing } from "./services";

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			loggedIn: false,
			user: {},
		};

		this.loginHandle = this.loginHandle.bind(this);
		this.logoutHandle = this.logoutHandle.bind(this);
	}
	componentWillMount() {
		if (Signing.checkKeys()) this.setState({ loggedIn: true });
	}

	loginHandle = () => this.setState({ loggedIn: true });

	logoutHandle = () => this.setState({ loggedIn: false });

	render() {
		return (
			<div className="App tc">
				<Route
					exact
					strict
					path="/"
					render={(props) => (
						<div>
							{this.state.loggedIn ? (
								<Redirect to="/evidencelist"></Redirect>
							) : null}
							<Login loginHandle={this.loginHandle} />
							<br />
							<Link
								className="link"
								to="/register"
								exact
								className="f6 link dim ph3 pv2 mh2 dib white bg-green">
								{" "}
								Click here to Register{" "}
							</Link>
						</div>
					)}
				/>
				<Route exact path="/register" component={Register} />
				<Route
					exact
					path="/evidencelist"
					render={(props) => (
						<div>
							{!this.state.loggedIn ? (
								<Redirect to="/"></Redirect>
							) : null}
							<EvidenceList
								logoutHandle={this.logoutHandle}
							/>
						</div>
					)}
				/>
				<Route
					exact
					path="/createevidence"
					component={CreateEvidence}
				/>
			</div>
		);
	}
}

export default App;
