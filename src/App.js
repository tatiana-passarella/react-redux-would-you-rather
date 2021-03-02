import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { handleInitialData } from './actions/shared';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <Router>
        <div className="App">
            <p>Hello world</p>
        </div>
      </Router>
    );
  }
}


export default connect(
  null,
  { handleInitialData }
)(App);