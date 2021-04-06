import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Leaderboard extends Component {
    render () {
        const { users, userIDs } = this.props
        //console.log(this.props)

        return (
            <Fragment>
                <h2 className="text-center my-3">
                    <small>Leaderboard</small>
                </h2>
                {userIDs.map((id) => (
                    <Row key={id} className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card bg="light" className="m-3">
                            <Card.Header>
                                <Image
                                    src={users[id].avatarURL}
                                    roundedCircle
                                    fluid
                                    width="80"
                                    height="80"
                                    className="mr-2"
                                    alt=""
                                />
                                {users[id].name}
                            </Card.Header>
                            <Card.Body className="d-flex justify-content-center">
                                <Card.Text>
                                    Answered Questions: {Object.keys(users[id].answers).length}
                                    <br />
                                    Created Questions: {users[id].questions.length}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                Score: {Object.keys(users[id].answers).length + users[id].questions.length}
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                ))}
            </Fragment>
        )
    }
}

function mapStateToProps({ users }) {
	const sortedUserIDs = Object.keys(users).sort((idA, idB) => {
		const scoreA =
			Object.keys(users[idA].answers).length + users[idA].questions.length;
		const scoreB =
			Object.keys(users[idB].answers).length + users[idB].questions.length;

		return scoreB - scoreA;
	});

	return {
        users,
		userIDs: sortedUserIDs
	};
}

export default connect(mapStateToProps)(Leaderboard);