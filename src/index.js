import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const defaultState = {
  currencies: ["eur", "uah", "usd"]
}

const reducer = (state = defaultState, action) => {
  if (action.type === "SET_CURRENCIES") {
    return { ...state, currencies: action.payload }
  }

  return state
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
