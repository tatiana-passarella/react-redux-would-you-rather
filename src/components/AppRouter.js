import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './Navigation';
import Home from './Home';
import PollQuestion from './PollQuestion'


class AppRouter extends Component {
	render() {
		return (
			<Router>
				<Container>
                    <Navigation />
					<main>
						<Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/questions/:id" component={PollQuestion} />
						</Switch>
					</main>
				</Container>
			</Router>
		);
	}
}

export default AppRouter;
