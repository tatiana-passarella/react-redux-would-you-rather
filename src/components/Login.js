import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { setAuthUser } from '../actions/authUser';

class Login extends Component {
	state = {
		errorMsg: ''
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const userID = this.userID.value;
		const { dispatch } = this.props;

		userID !== '' ? dispatch(setAuthUser(userID)) :	this.setState({ errorMsg: 'You must choose a user' })
		
	};

	render() {
		const { userNames } = this.props;
		const { errorMsg } = this.state;

		return (
			<Row className="justify-content-center align-items-center min-vh-100">
				<Col xs={12} md={4}>
					<Card bg="light" className="text-center">
						<Card.Header>Login</Card.Header>
						<Card.Body>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="formGridState">
									<Row className="justify-content-md-center">
										<Col xs={12} sm={4} md={4}>
											<Image
											src="logo192.png"
											roundedCircle
											fluid
											width="192"
											height="192"
											alt="logo"
											/>
										</Col>
									</Row>
									<Form.Label><b>Would you rather app</b></Form.Label>
									{errorMsg ? (
										<p className="text-danger">{errorMsg}</p>
									) : null}

									<Form.Control
										as="select"
										ref={(id) => (this.userID = id)}
									>
										<option value="">Select user</option>
										{userNames.map((user) => (
											<option value={user.value} key={user.value} >
												{user.label}
											</option>
										))}
									</Form.Control>
								</Form.Group>

								<Button type="submit" variant="outline-dark" >
									Login
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		userNames: Object.keys(users).map((id) => ({
			value: id,
			label: users[id].name
		}))
	};
}

export default connect(mapStateToProps)(Login);