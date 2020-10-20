import React from 'react';
import Title from '../components/Title';

class Register extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			username:'',
			email: ''
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value});
	}

	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}

	handleSubmit(event) {
		// alert(`Hey ${this.state.username} with mail: ${this.state.email}`);
		event.preventDefault();
		// Take username and email data from here to generate the keys
	}



	render() {
		return(
			<div className="tc pa3">
				<Title />
				<div className='dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025'>
					<h1 className="mr2">Registration</h1><br/>
					<form onSubmit={this.handleSubmit}>
						<input
							className="pa2 ma3 br4"
							type="text"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleUsernameChange}
						/>
						<br/>
						<input
							className="pa2 ma3 br4"
							type="email"
							placeholder="Email"
							value={this.state.email}
							onChange={this.handleEmailChange}
						/>
						<br/>
						<input 
							className="pa2 ma3 br2 bg-transparent grow" 
							type="submit"
							value="Generate Keys"
						/>
					</form>
				</div>
			</div>
		);
	}
	
}

export default Register;