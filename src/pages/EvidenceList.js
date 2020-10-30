import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Requests, Utils, Signing } from "../services";

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
			<a
				class="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue"
				href={`${process.env.REACT_APP_IPFS_BASE_URL}${props.value}`}>
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
			list2: [],
		};
	}
	async componentWillMount() {
		const response = await Requests.getStates(
			`${Utils.NAMESPACE}${Utils.TYPE_PREFIXES.EVIDENCE_PREFIX}`
		);
		const response2 = await Requests.getStates(
			`${Utils.NAMESPACE}${Utils.TYPE_PREFIXES.PERSON_PREFIX}`
		);
		this.setState({
			list: response.data.map((item) => ({
				address: item.address,
				data: Utils.decodeBase64(item.data),
			})),
			list2: response2.data.map((item) => ({
				address: item.address,
				data: Utils.decodeBase64(item.data),
			})),
		});
	}

	onLogout = () => {
		Signing.deleteKeys();
		this.props.logoutHandle();
	};

	render() {
		return (
			<div className="tc">
				<nav class="db dt-l w-100 border-box pa3 ph5-l">
					<a
						className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l"
						href="/"
						title="Home">
						<img
							className="grow shadow-5 fl"
							alt="Evidence Manager Logo"
							src="./onlylogo.jpg"
							height="75px"
							width="auto"
						/>
					</a>
					<h1 className="tc">List of Evidences</h1>

					<div class="dtc v-mid tr">
						<a
							className="f6 link dim ph3 pv2 mh2 dib white bg-green"
							href="/createevidence">
							Create Evidence
						</a>
						<button
							className="f6 dim ph3 pv2 mh2 dib white bg-red ba b--black-025"
							onClick={(e) => this.onLogout()}>
							Logout
						</button>
					</div>
				</nav>

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
			</div>
		);
	}
}
export default EvidenceList;
