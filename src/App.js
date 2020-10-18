import React from 'react';
import 'tachyons';
import './App.css';
import Title from './Title';
import Login from './Login';
import Register from './Register';
import EvidenceList from './EvidenceList';
import CreateEvidence from './CreateEvidence';
import Generated from './Generated';
import EvidenceDetails from './EvidenceDetails';
import {Route, Link, Redirect} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  loginHandle = (event) => {
    //set this state to true only after confirming credentials
    this.setState({ loggedIn: true });
  }

  render() {
    return (
      <div className="App tc">
        <Route exact strict path="/" render={
          () => {
            return(
              <div className="tc pa3">
                <Title />
                <Login loginDone={this.loginHandle.bind(this)}/>
                <br/><Link className="link" to="/register" exact> Click here to Register </Link>
              </div>
            );
          }
        }/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/keygenerated" component={Generated} />
        <Route exact path="/evidencelist" component={EvidenceList} />
        <Route exact path="/createevidence" component={CreateEvidence} />
        <Route exact path="/evidencedetails" component={EvidenceDetails} />
      </div>
    );
  }
}

export default App;
