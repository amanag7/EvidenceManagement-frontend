import React from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css"
import { Requests, Utils } from "../services";

const columns = [
		{
			Header: "Evidence Name / Address",
			accessor: "address",
		}
		// TODO: display more columns here like "Added by (user)" and "Date of Submission" in the table.
		// To be done after getting the data from ipfs.
]


class EvidenceList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: []
		};

		this.routeChange = this.routeChange.bind(this);
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
	
	routeChange() {
		this.props.history.push('/createevidence');
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

				<h1 className="tc">List of Evidences</h1>
				<br />

					{this.state.list.length !== 0 ? (	
							<div className="ma3 br2 pa2">
							<ReactTable
								columns={columns}
								data ={this.state.list}
								sortable
								filterable
								defaultSorted = {this.state.list.address}
								defaultPageSize = {10}
								noDataText = {"No evidences found"}
								minRows= {5}
								className = "-striped -highlight pointer"
								getTdProps={(state, rowInfo, column, instance) => {
									return {
										onClick: (e, handleOriginal) => {
											this.props.history.push({
												pathname: '/evidencedetails',
												state: {
													address: rowInfo.original.address,
													data: rowInfo.original.data
												}
											})
										}
									}
								}}
							/>
							</div>
						
					) : (
						<div className="tc ma5 f3 red dim">No Evidences Found.</div>
					)}

				<button 
					className = "pa2 mt5 ma3 br2 bg-transparent grow"
					onClick = {this.routeChange}
				>
					Create Evidence
				</button>
			</div>
		);
	}
}
export default EvidenceList;
