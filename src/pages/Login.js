import React from 'react';
import Title from "../components/Title";


class Login extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			publicKey:'',
			privateKey:''
		};

		this.handlePublicKeyChange = this.handlePublicKeyChange.bind(this);
		this.handlePrivateKeyChange = this.handlePrivateKeyChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handlePublicKeyChange(event) {
		this.setState({publicKey: event.target.value});
	}

	handlePrivateKeyChange(event) {
		this.setState({privateKey: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		
		// check the credentials here for the public and private keys before calling the loginHandle method
		this.props.loginHandle();
	}

	render() {
		return(
			<div className="tc pa3">
				<Title />
				<div className='dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025'>
					<h1 className="mr2">Login details</h1><br/>
					<form onSubmit={this.handleSubmit}>
						<input
							className="pa2 ma3 br4"
							type="text"
							placeholder="Public Key"
							value={this.state.publicKey}
							onChange={this.handlePublicKeyChange}
						/>
						<br/>
						<input
							className="pa2 ma3 br4"
							type="password"
							placeholder="Private Key"
							value={this.state.privateKey}
							onChange={this.handlePrivateKeyChange}
						/>
						<br/>
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