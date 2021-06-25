import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage/HomePage.js';
import NaviBar from './components/NaviBar/NaviBar.js';
import Login from './components/LoginSignup/Login';
import Register from './components/LoginSignup/Register'
import Communities from './components/Communities/Communities.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NaviBar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/discovery" component={Communities}/>
      </Switch>
    </Router>
    
    {/* <Communities/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
