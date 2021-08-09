import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage/HomePage.js';
import NaviBar from './components/NaviBar/NaviBar.js';
import Login from './components/LoginSignup/Login';
import Register from './components/LoginSignup/Register'
import Profile from './components/Profile/Profile.js';
import Draft from './components/DraftJS/Draft.js';
import Discovery from './components/SearchBar/Discovery.js';
import Communities from './components/Communities/Communities.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDetail from './components/Posts/PostDetail.js';
import { UserContextProvider } from './components/Context/UserContext.js';
import AutoLogin from './wrapper/AutoLogin.js';
import CreateCommunity from './components/Communities/createCommunity/CreateCommunity.js';
import { createTheme } from '@material-ui/core';
import { CommunitiesContextProvider } from '../src/components/Context/CommunityContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <CommunitiesContextProvider>
    <AutoLogin/>
    <Router>
      <NaviBar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/community/:communityName/posts/:postId" component={PostDetail} />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/draft/" component={Draft} />
        <Route path="/discovery/:toSearch" component={Discovery} />
        <Route path="/community/:communityName" component={Communities} />
        <Route path="/createCommunity" component={CreateCommunity}/>
      </Switch>
    </Router>
    </CommunitiesContextProvider>
    </UserContextProvider>



  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
