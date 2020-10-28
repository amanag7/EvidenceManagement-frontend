import React from "react";
import { Requests, Utils } from "../services";

class EvidenceList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
		};
	}
	async componentDidMount() {
		const response = await Requests.getStates(
			`${Utils.NAMESPACE}${Utils.TYPE_PREFIXES.EVIDENCE_PREFIX}`
		);
		// response => {
		//  [
		//   ...
		//	  {
		//		 "address": String,
		//		 "data": String (Base64 encoded buffer)
		//	  }
		//   ...
		//  ]
		//}
		this.setState({ list: response.data });
	}

	render() {
		return (
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
					{this.state.list.length !== 0 ? (
						this.state.list.map((item) => (
							<li key={item.address}>
								<div className="dib mt2">
									<h3>{item.address}</h3>
								</div>
								{/* <br />
								{/* This name item needs to be a link which on clicking shows the evidence's details */}
								{/* <div className="dib ma3">
									Date Added: {item.key}
								</div> */}
								{/* <div className="dib">
									Submitted By: {item.user}
								</div> */}
							</li>
						))
					) : (
						<div>No Evidences Found.</div> // TODO: Design for not found div
					)}
				</ul>
			</div>
		);
	}
}
export default EvidenceList;
