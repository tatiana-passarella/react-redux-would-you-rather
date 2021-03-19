import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './Navigation';
import Home from './Home';


class AppRouter extends Component {
	render() {
		return (
			<Router>
				<Container>
                    <Navigation />
					<main>
						<Switch>
                            <Route exact path="/" component={Home} />
                            
						</Switch>
					</main>
				</Container>
			</Router>
		);
	}
}

export default AppRouter;
