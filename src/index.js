import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyB-adhdh_19l6j4WEJ2z_8OJr0nF3776-8",
    authDomain: "quickstart-1586856405800.firebaseapp.com",
    databaseURL: "https://quickstart-1586856405800-default-rtdb.firebaseio.com",
    projectId: "quickstart-1586856405800",
    storageBucket: "quickstart-1586856405800.appspot.com",
    messagingSenderId: "16504137723",
    appId: "1:16504137723:web:45f4174ff01caba3f34d5e",
    measurementId: "G-K98VNF3JLC"
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
