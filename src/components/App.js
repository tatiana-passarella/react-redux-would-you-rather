import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Login from './Login';
import AppRouter from './AppRouter';
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <LoadingBar />
        <div className="App">
          {authUser === null ? (
            <Container>
              <Login />
            </Container>
          ) : (
            <AppRouter />
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