import React from 'react';

const Generated = (props) => {
		return(
			<div className="tc pa3">
				<div className='dib b--solid bw1 b--moon-gray mt2 pa3 br4 bg-black-025'>
					<h2 className="tc">Your keys: </h2>
					<p>(Save these carefully for future reference)</p>
					<p className="f3">Public Key:</p>
					<p>{props.publicKey}</p>
					<p className="f3">Private Key:</p>
					<p>{props.privateKey}</p>
				</div>
			</div>
		);
}

export default Generated;