import React from 'react';
import Title from '../components/Title';

class Generated extends React.Component {
	render() {
		return(
			<div className="tc pa3">
				<Title />
				<div className='dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025'>
					<h4 className="tc">Your keys: </h4>
					{/*	display the keys here (still figuring it out)*/}
				</div>
			</div>
		);
	}
}

export default Generated;