import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage/HomePage.js';
import NaviBar from './components/NaviBar/NaviBar.js';
import Login from './components/LoginSignup/Login';
import Register from './components/LoginSignup/Register'
import Profile from './components/Profile/Profile.js';
import Draft from './components/DraftJS/Draft.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NaviBar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/draft" component={Draft} />
      </Switch>
    </Router>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
