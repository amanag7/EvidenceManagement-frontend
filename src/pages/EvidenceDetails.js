import React from "react";
import { Requests, Utils } from "../services";
import { withRouter } from "react-router-dom";

const EvidenceDetails = (props) => {
	/*
		{props.location.state.address} has the 'address: String' field of the evidence.
		{props.location.state.data} has the 'data : String (Base64 encoded buffer)' field of the evidence
		TODO : Get data and display it here
	*/
	return (
		<div className="tc pa3">
			<img
				className="grow shadow-5 fl"
				alt="Evidence Manager Logo"
				src="./onlylogo.jpg"
				height="75px"
				width="auto"
			/>
			<h1>Details of an Evidence</h1>
			<br />
			{/*	Displa data here */}
			<div className="dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025">
				<h2>Evidence Name: </h2>
				<br />
				<p>Date Added:  </p>
				<br />
				<p>Submitted By:  </p>
				<br />
				<h3>Details:</h3>
				<br />
				<p>		</p>
				<br />
				<p>File:</p>
				
			</div>
		</div>
	);
};

export default EvidenceDetails;
