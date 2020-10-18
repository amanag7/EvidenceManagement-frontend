import React from 'react';

const Login = ({ loginDone }) => {
	return(
		<div className='dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025'>
			<h1 className="mr2">Login details</h1><br/>
			<input className="pa2 ma3 br4" type="text" placeholder="Public Key" /><br/>
			<input className="pa2 ma3 br4" type="password" placeholder="Private Key" /><br/>
			<button className="pa2 ma3 br2 bg-transparent grow" type="submit" onClick={loginDone}>Log in</button>
		</div>
	);
}


export default Login;