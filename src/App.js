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
	}
	componentWillMount() {
		if (Signing.checkKeys()) this.setState({ loggedIn: true });
	}

	loginHandle = (publicKey, privateKey) => {
		//set this state to true only after confirming credentials
		this.setState({ loggedIn: true });
	};

	render() {
		return (
			<div className="App tc">
				<Route
					exact
					strict
					path="/"
					render={(props) => {
						return (
							<div>
								{this.state.loggedIn ? (
									<Redirect to="/evidencelist"></Redirect>
								) : null}
								<Login loginHandle={this.loginHandle} />
								<br />
								<Link
									className="link"
									to="/register"
									exact>
									{" "}
									Click here to Register{" "}
								</Link>
							</div>
						);
					}}
				/>
				<Route exact path="/register" component={Register} />
				<Route
					exact
					path="/evidencelist"
					component={EvidenceList}
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
