import React from "react";
import Title from "../components/Title";
import { IPFS, Requests, Signing, Payload } from "../services";
import { Link } from "react-router-dom";

class CreateEvidence extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			key: "",
			user: "",
			details: "",
			file: null,
			cid: "",
			isEmpty: false,
		};

		this.handleEviNameChange = this.handleEviNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
	}

	handleEviNameChange(event) {
		this.setState({ name: event.target.value });
	}

	async handleSubmit(event) {
		event.preventDefault();
		if (this.state.name !== "") {
			if (this.fileInput.current.files.length !== 0) {
				this.setState({ isEmpty: false });
				const file = this.fileInput.current.files[0];
				const cid = await IPFS.addFile(file);
				this.setState({ cid });
				const keys = Signing.getKeys();
				const signer = Signing.createSigner(keys);
				const payload = Payload.createEvidencePayload(
					cid,
					this.state.name,
					file.type
				);
				const data = await Requests.submitPayloads(
					keys,
					signer,
					payload
				);

				const res = await Requests.getBatchStatus(data.link);
				// TODO: Handle batch status
				// res.data => {
				//  id: STRING,
				//  invalid_transactions: [ (Pick array's 0th element for displaying)
				//	 ...
				//	  {
				//      id: STRING,
				//      message: STRING
				//    }
				//	 ...
				//  ],
				//	status: STRING,
				// }
				// TODO: do this for successful response
				this.props.history.push("/evidencelist");
				// TODO: Display two errors
			} else this.setState({ isEmpty: true });
		} else this.setState({ isEmpty: true });
	}

	render() {
		return (
			<div className="tc pa3">
				<Title />

				<div className="dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025">
					<h1>Submit an Evidence</h1>

					<form onSubmit={this.handleSubmit}>
						<input
							className="pa2 ma3 br4"
							type="text"
							placeholder="Evidence Name"
							value={this.state.name}
							onChange={this.handleEviNameChange}
						/>
						<br />

						<label>
							<h4 className="mt4">Upload file: </h4>
							<p>(preferably pdf or jpg)</p>

							<input
								className="tc"
								type="file"
								ref={this.fileInput}
							/>
						</label>
						<br />
						{this.state.isEmpty && (
							<div>
								<p className="tc mt4 red">
									Please fill the details or upload
									file
								</p>
							</div>
						)}

						<input
							className="pa2 mt4 ma3 br2 bg-transparent grow"
							type="submit"
							value="Submit Evidence"
						/>
						{this.state.cid !== "" ? (
							<a
								href={`${process.env.REACT_APP_IPFS_BASE_URL}${this.state.cid}`}>
								Download
							</a>
						) : null}
					</form>
				</div>
				<br />
				<Link
					to="/evidencelist"
					exact
					className="f6 link dim ph3 pv2 mt3 dib white bg-green">
					{" "}
					List of Evidences{" "}
				</Link>
			</div>
		);
	}
}

export default CreateEvidence;
