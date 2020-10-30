import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Requests, Utils } from "../services";

const columns = [
	{
		Header: "Address",
		accessor: "address",
	},
	{
		Header: "Title",
		accessor: "data.title",
	},
	{
		Header: "Created At",
		accessor: "data.timestamp",
		Cell: (props) => (
			<span>{`${new Date(props.value).toUTCString()}`}</span>
		),
	},
	{
		Header: "Download",
		accessor: "data.cid",
		Cell: (props) => (
			<a href={`${process.env.REACT_APP_IPFS_BASE_URL}${props.value}`}>
				Download
			</a>
		),
	},
];

class EvidenceList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
		};

		this.routeChange = this.routeChange.bind(this);
	}
	async componentWillMount() {
		const response = await Requests.getStates(
			`${Utils.NAMESPACE}${Utils.TYPE_PREFIXES.EVIDENCE_PREFIX}`
		);
		this.setState({
			list: response.data.map((item) => ({
				address: item.address,
				data: Utils.decodeBase64(item.data),
			})),
		});
	}

	routeChange() {
		this.props.history.push("/createevidence");
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
							data={this.state.list}
							sortable
							filterable
							defaultSorted={this.state.list.address}
							defaultPageSize={10}
							noDataText={"No evidences found"}
							minRows={5}
							className="-striped -highlight pointer"
						/>
					</div>
				) : (
					<div className="tc ma5 f3 red dim">
						No Evidences Found.
					</div>
				)}

				<button
					className="pa2 mt5 ma3 br2 bg-transparent grow"
					onClick={this.routeChange}>
					Create Evidence
				</button>
			</div>
		);
	}
}
export default EvidenceList;
