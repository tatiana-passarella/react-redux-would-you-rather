import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { addAnswerToUser } from '../actions/users';

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";
export const ADD_QUESTION = 'ADD_QUESTION';


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
  };
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question
	};
}

export function handleAddQuestion(optionOne, optionTwo) {
	return (dispatch, getState) => {
		const { authUser } = getState();
		dispatch(showLoading());

		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: authUser
		})
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()));
	};
}

export function handleSaveAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());

    return saveQuestionAnswer({ 
      authUser, 
      qid, 
      answer 
    })
      .then(() => {
        dispatch(addAnswerToQuestion(authUser, qid, answer));
        dispatch(addAnswerToUser(authUser, qid, answer));
        dispatch(hideLoading());
    });
  };
}