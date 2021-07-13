import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './store/store'

import firebase from 'firebase/app'

firebase.initializeApp({
  apiKey: "AIzaSyClFtAvWpH48W79OrsVYrjzUrZ9z720ctQ",
  authDomain: "workout-diary-f4b5d.firebaseapp.com",
  databaseURL: "https://workout-diary-f4b5d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "workout-diary-f4b5d",
  storageBucket: "workout-diary-f4b5d.appspot.com",
  messagingSenderId: "487051166931",
  appId: "1:487051166931:web:b5e0c9348aac67c5ee8026",
  measurementId: "G-9LE0QHV3VW"
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
