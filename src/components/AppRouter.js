import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './Navigation';
import Home from './Home';
import PollQuestion from './PollQuestion'
import NewQuestion from './NewQuestion';


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
							<Route path="/add" component={NewQuestion} />
						</Switch>
					</main>
				</Container>
			</Router>
		);
	}
}

export default AppRouter;
