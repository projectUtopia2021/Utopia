import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage/HomePage.js';
import NaviBar from './components/NaviBar/NaviBar.js';
import Login from './components/LoginSignup/Login';
import Register from './components/LoginSignup/Register'
import Profile from './components/Profile/Profile.js';
import Draft from './components/DraftJS/Draft.js';
import Discovery from './components/Discovery/Discovery.js';
import Communities from './components/Communities/Communities.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContextProvider } from './components/Context/UserContext.js';
import AutoLogin from './wrapper/AutoLogin.js';
import CreateCommunity from './components/Communities/CreateCommunity.js';
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette:{
    type:'light'
  }
});

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
    <Router>
      <AutoLogin/>
      <NaviBar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/draft" component={Draft} />
        <Route path="/discovery" component={Discovery} />
        <Route path="/communities" component={Communities} />
        <Route path="/community/create" component={CreateCommunity}/>
      </Switch>
    </Router>
    </UserContextProvider>
    </React.StrictMode>,
  document.getElementById('root')
);
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
