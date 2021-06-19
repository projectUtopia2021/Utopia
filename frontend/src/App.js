import HomePage from './components/HomePage/HomePage.js';
import Login from './components/LoginSignup/Login.js';
import Register from './components/LoginSignup/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path={["/", "/homepage"]} component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
    </Router>
        
    </div>
  );
}

export default App;
