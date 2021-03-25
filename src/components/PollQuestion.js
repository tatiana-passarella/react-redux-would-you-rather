import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleSaveAnswer } from '../actions/questions'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';


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
        const { question, authorAvatar, timestamp, author, optionOne, optionTwo, answered, isOneAnswered, isTwoAnswered } = this.props
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const optionOnePercentage = (optionOneVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
        const optionTwoPercentage = (optionTwoVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
        console.log(this.props)

        return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
                    { answered ? (
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
                                {author} asks:
						</Card.Header>
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