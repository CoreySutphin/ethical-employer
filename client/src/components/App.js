import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import logo from '../logo.svg';

import Home from './home';
import Company from './company';
import Login from './login';
import NewCompany from './newCompany';
import Account from './account';
import SignUp from './signUp';
import Review from './review';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }

  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/company' component={Company}/>
            <Route exact path='/login' render={(props) => (
              sessionStorage.getItem("user")
                ? <Redirect to="/" />
                : <Login {...props} />
            )}/>
            <Route exact path='/newcompany' render={(props) => (
              sessionStorage.getItem("user")
                ? <NewCompany {...props} />
                : <Redirect to="/login" />
            )}/>
            <Route path='/account' render={(props) => (
              sessionStorage.getItem("user")
                ? <Account {...props} />
                : <Redirect to="/login" />
            )}/>
            <Route exact path='/signup' render={(props) => (
              sessionStorage.getItem("user")
                ? <Redirect to="/" />
                : <SignUp {...props} />
            )}/>
            <Route exact path='/review' render={(props) => (
              sessionStorage.getItem("user")
                ? <Review {...props} />
                : <Redirect to="/login" />
            )}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
