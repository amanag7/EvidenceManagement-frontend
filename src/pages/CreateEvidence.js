import React from 'react';
import Title from '../components/Title'

// have to add file support

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '-' + day + '-' + year;
}

class CreateEvidence extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			name:'',
			key:'',
			user:'',
			details:''
		}

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
		this.setState({name: event.target.value});
	}

	handleDetailsChange(event) {
		this.setState({details: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		let date = new Date();

		this.setState({
			key: getFormattedDate(date), 	// shown as Date Added in the Evidence List (mm-dd-yyyy format)
			user:''							// user data to be taken from database
		})

		alert(`Successfully submitted evidence! Selected file - ${this.fileInput.current.files[0].name}`);
	}

	render() {
		return(
			<div className="tc pa3">

				<Title />

				<div className='dib b--solid bw1 b--moon-gray mt5 pa3 br4 bg-black-025'>

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
						
					</form>
				</div>
			</div>
		);
	}
}

export default CreateEvidence;