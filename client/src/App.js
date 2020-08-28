import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Homepage from './components/layout/Homepage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import Card from './components/card/Card';


import './app.scss';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { loadProfile } from './actions/profile';

// Check for existing auth token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
    // store.dispatch(loadProfile());

  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Homepage} />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/cards" component={Card} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
