import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
  } from './_DATA';
  
  export function getInitialData() {
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => ({
        users,
        questions
      })
    );
  }
  
  
  export function saveQuestionAnswer(authUser, qid, answer) {
    return _saveQuestionAnswer({ authUser, qid, answer });
  }