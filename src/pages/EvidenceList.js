import React from 'react';

// Have to get the data from evidence database to here
const eviList = [
	{
		key:'10-20-2020',
		name:'Photograph',
		details: 'Photograph of the suspected murderer',
		user: 'amanag',
		file:''
	},
	{
		key:'10-04-2020',
		name:'Dead body',
		details:'Photograph of the dead body',
		user:'amanag',
		file:''
	}
];

class EvidenceList extends React.Component {

	render() {
		return(
			<div className="tc pa3">
				<img
				className="grow shadow-5 fl"
				alt="Evidence Manager Logo"
				src="./onlylogo.jpg"
				height="75px"
				width="auto"
				/>

				<h1 className="">List of Evidences</h1>
				<br />

				<ul>
					{eviList.map(item => (
						<li key={item.key}>
							<div className="dib mt2"><h3>{item.name}</h3></div><br/> 
							{/* This name item needs to be a link which on clicking shows the evidence's details */}
							<div className="dib ma3">Date Added: {item.key}</div>
							<div className="dib">Submitted By: {item.user}</div>
						</li>
					))}
				</ul>


			</div>
		);
	}
}

export default EvidenceList;