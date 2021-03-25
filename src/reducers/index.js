import { combineReducers } from 'redux';
import authUser from '../reducers/authUser';
import questions from '../reducers/questions';
import users from '../reducers/users';
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  authUser,
  questions,
  users,
  loadingBar: loadingBarReducer,
});