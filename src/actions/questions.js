import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
  };
}

export function handleSaveAnswer (qid, answer) {
  return (dispatch, getState) => {
      const { authUser } = getState()
      dispatch(showLoading())
      return saveQuestionAnswer({authUser, qid, answer})
          .then(() => {
              dispatch(addAnswerToQuestion(authUser, qid, answer))
              dispatch(addAnswerToQuestion(authUser, qid, answer))
              dispatch(hideLoading())
          })  
  }
}