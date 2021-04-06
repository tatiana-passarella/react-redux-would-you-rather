import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Login from './Login';
import LoadingBar from 'react-redux-loading'
import Navigation from './Navigation';
import Home from './Home';
import Question from './Question'
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard'
import PageNotFound from './PageNotFound';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
          <LoadingBar />
          <Container>
            <Switch>
              { authUser === null
                ? <Route path='/' exact component={Login} />
                : 
                <Fragment>
                  <Navigation />
                  <Route exact path="/" component={Home} />
                  <Route exact path="/questions/:id" component={Question} />
                  <Route exact path="/add" component={NewQuestion} />
                  <Route exact path='/leaderboard' component={Leaderboard} />
                </Fragment>
              }
              <Route component={PageNotFound} />
            </Switch>
          </Container>
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