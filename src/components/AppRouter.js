import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './Navigation';
import Home from './Home';
import Question from './Question'
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard'
import PageNotFound from './PageNotFound';


class AppRouter extends Component {
	render() {
		return (
			<Router>
				<Container>
                    <Navigation />
					<main>
						<Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/questions/:id" component={Question} />
							<Route path="/add" component={NewQuestion} />
							<Route path='/leaderboard' exact component={Leaderboard} />
							<Route component={PageNotFound} />
						</Switch>
					</main>
				</Container>
			</Router>
		);
	}
}

export default AppRouter;
