import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Login from './Login';
import Navbar from './Navbar';
import Home from './Home';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                  <Login />
              )}
            />
          ) : (
            <Fragment>
              <Navbar />
              <Route exact path="/" component={Home} />
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);