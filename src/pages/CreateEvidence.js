import React from "react";
import Title from "../components/Title";
import { IPFS } from "../services";
// have to add file support

function getFormattedDate(date) {
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");

	return month + "-" + day + "-" + year;
}

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
		};

		this.handleEviNameChange = this.handleEviNameChange.bind(this);
		this.handleDetailsChange = this.handleDetailsChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
		/* 
			Use FileAPI to access and upload the files to server. Refer here:
			https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
			I couldn't understand it...
		*/
	}

	handleEviNameChange(event) {
		this.setState({ name: event.target.value });
	}

	handleDetailsChange(event) {
		this.setState({ details: event.target.value });
	}

	async handleSubmit(event) {
		event.preventDefault();

		let date = new Date();

		this.setState({
			key: getFormattedDate(date), // shown as Date Added in the Evidence List (mm-dd-yyyy format)
			user: "", // user data to be taken from database
		});

		if (this.fileInput.current.files.length !== 0) {
			const cid = await IPFS.addFile(this.fileInput.current.files[0]);
			this.setState({ cid });
		} else console.log("No file uploaded");
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

						<textarea
							className="pa2 ma3 br4"
							placeholder="Evidence Details"
							value={this.state.details}
							onChange={this.handleDetailsChange}
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

						<input
							className="pa2 mt5 ma3 br2 bg-transparent grow"
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
			</div>
		);
	}
}

export default CreateEvidence;
