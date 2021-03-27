import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleSaveAnswer } from '../actions/questions'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';


class PollQuestion extends Component {
    state = {
        selectedOption: ''
    }

    selectRadio = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    submitAnswer = (e) => {
        e.preventDefault()
        const { savePollAnswer } = this.props
        const answer = this.state.selectedOption
        savePollAnswer(answer)
    }


    render () {
        const { authUser, question, authorAvatar, timestamp, author, authorName, optionOne, optionTwo, answered, isOneAnswered, isTwoAnswered } = this.props
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const optionOnePercentage = (optionOneVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
        const optionTwoPercentage = (optionTwoVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
        const totalVotes = optionOneVotes + optionTwoVotes;
        console.log(this.props)

        return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
                    { answered ? (
                      <Fragment>
						<Card.Header>
                            <Image
                                    src={authorAvatar}
                                    roundedCircle
                                    fluid
                                    width="80"
                                    height="80"
                                    className="mr-2"
                                    alt=""
                                />
                                {authorName} asks:
						</Card.Header>
                        <Card.Body className="d-flex justify-content-center">
                            <ul>
                                <li>
                                    {optionOne}
                                    {question.optionOne.votes.includes(authUser) ? (
                                        <span className="text-danger ml-2">
                                            &lt;- Your choice
                                        </span>
                                    ) : null}
                                </li>
                                <ProgressBar
                                    now={optionOnePercentage}
                                    label={`${optionOnePercentage}%`}
                                    variant="info"
                                />
                                <Card.Text className="text-muted">
                                    chosen by {optionOneVotes} out of {totalVotes}{' '}
                                    users
                                </Card.Text>
                                <li>
                                    {optionTwo}
                                    {question.optionTwo.votes.includes(authUser) ? (
                                        <span className="text-danger ml-2">
                                            &lt;- Your choice
                                        </span>
                                    ) : null}
                                </li>
                                <ProgressBar
                                    now={optionTwoPercentage}
                                    label={`${optionTwoPercentage}%`}
                                    variant="info"
                                />
                                <Card.Text className="text-muted">
                                    chosen by {optionTwoVotes} out of {totalVotes}{' '}
                                    users
                                </Card.Text>
                            </ul>
                        </Card.Body>
                      </Fragment>
                    ) : (
                        <p>Not answered</p>
                    )}
                    </Card>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps ({authUser, questions, users}, props) {
    const question_id = props.match.params.id
    const question = questions[question_id]
    const authorAvatar = users[question.author].avatarURL
    const author = users[question.author].id
    const authorName = users[question.author].name
    const timestamp = formatDate (question.timestamp)
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    const isOneAnswered = question.optionOne.votes.includes(authUser)
    const isTwoAnswered = question.optionTwo.votes.includes(authUser)
    const answered = isOneAnswered || isTwoAnswered

    return {
        question_id,
        users,
        questions,
        authUser,
        question,
        authorAvatar,
        author,
        authorName,
        timestamp,
        optionOne,
        optionTwo,
        isOneAnswered,
        isTwoAnswered,
        answered
    }
}

function mapDispatchToProps (dispatch, props) {
    const question_id = props.match.params.id
    return {
        savePollAnswer : (answer) => {
            dispatch(handleSaveAnswer(question_id, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollQuestion)