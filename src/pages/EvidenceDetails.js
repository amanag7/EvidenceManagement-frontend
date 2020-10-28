import React from "react";
import { Requests, Utils } from "../services";

const EvidenceDetails = (props) => {
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

			<div className="dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025">
				<h2>Evidence Name: {/*props.name*/} </h2>
				<br />
				<p>Date Added: {/*props.key*/} </p>
				<br />
				<p>Submitted By: {/*props.user*/} </p>
				<br />
				<h3>Details:</h3>
				<br />
				<p>{/*props.details*/}</p>
				<br />
				<p>File:</p>
				{/*props.file*/}
			</div>
		</div>
	);
};

export default EvidenceDetails;
