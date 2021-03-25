import React, { Component } from 'react'
import { connect } from 'react-redux'


class PollQuestion extends Component {
    render () {
        console.log(this.props)
        return (
           <div>
              Hello world, I am the PollQuestion component
           </div>
        )
    }
}

function mapStateToProps ({authUser, questions, users}, {id}) {
    const question_id = questions[id]

    return {
        users,
        questions,
        authUser,
        question_id,
    }
}

export default connect(mapStateToProps)(PollQuestion)