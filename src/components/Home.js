import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserCard from './UserCard';

class Home extends Component {
	render() {
		const { answeredQuestionIds, unansweredQuestionIds } = this.props;

		return (
			<Fragment>
				<Tabs>
					<Tab eventKey="unanswered" title="Unanswered Questions">
                        <Fragment>
                            <h2 className="text-center my-3">
                                <small>Would You Rather?</small>
                            </h2>
                            {unansweredQuestionIds.length ? (
                                unansweredQuestionIds.map((question) => <UserCard key={question.id} id={question.id} />)
                            ) : (
                                <p className="text-center">"There's no Unswered Questions, it's your turn to create new ones!"</p>
                            )}
                        </Fragment>
					</Tab>
					<Tab eventKey="answered" title="Answered Questions">
                        <Fragment>
                            <h2 className="text-center my-3">
                                <small>Would You Rather?</small>
                            </h2>
                            {answeredQuestionIds.length ? (
                                answeredQuestionIds.map((question) => <UserCard key={question.id} id={question.id} />)
                            ) : (
                                <p className="text-center">"There's no Answered Questions, it's your turn!"</p>
                            )}
                        </Fragment>
					</Tab>
				</Tabs>
			</Fragment>
		);
	}
}

function mapStateToProps({ authUser, questions, users }) {
	const answeredIds = Object.keys(users[authUser].answers);
	const answeredQuestionIds = Object.values(questions)
	  .filter(question => answeredIds.includes(question.id))
	  .sort((a, b) => b.timestamp - a.timestamp);
	const unansweredQuestionIds = Object.values(questions)
	  .filter(question => !answeredIds.includes(question.id))
	  .sort((a, b) => b.timestamp - a.timestamp);

	return {
		answeredQuestionIds,
		unansweredQuestionIds
	};
}

export default connect(mapStateToProps)(Home);