import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import middleware from './middleware';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);