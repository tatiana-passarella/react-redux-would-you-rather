import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Questions from './Questions';

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
                                unansweredQuestionIds.map((id) => <Questions key={id} id={id} />)
                            ) : (
                                <p className="text-center">"No more Unswered Questions! Time to create some new ones! "</p>
                            )}
                        </Fragment>
					</Tab>
					<Tab eventKey="answered" title="Answered Questions">
                        <Fragment>
                            <h2 className="text-center my-3">
                                <small>Would You Rather?</small>
                            </h2>
                            {answeredQuestionIds.length ? (
                                answeredQuestionIds.map((id) => <Questions key={id} id={id} />)
                            ) : (
                                <p className="text-center">"No Answered Questions yet! What are you waiting for???"</p>
                            )}
                        </Fragment>
					</Tab>
				</Tabs>
			</Fragment>
		);
	}
}

function mapStateToProps({ authUser, questions, users }) {
	const answeredQuestionIds = Object.keys(questions)
		.filter((id) => users[authUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	const unansweredQuestionIds = Object.keys(questions)
		.filter((id) => !users[authUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	return {
		answeredQuestionIds,
		unansweredQuestionIds
	};
}

export default connect(mapStateToProps)(Home);