import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import logo from '../logo.svg';

import Home from './home';
import Company from './company';
import Login from './login';
import NewCompany from './newCompany';
import Search from './search';
import User from './user';
import SignUp from './signUp';

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
            <Route path='/login' component={Login}/>
            <Route path='/newcompany' render={(props) => (
              sessionStorage.getItem("user")
                ? <NewCompany {...props}/>
                : <Redirect to="/login" push />
            )}/>
            <Route path='/search' component={Search}/>
            <Route path='/user' component={User}/>
            <Route path='/signup' component={SignUp}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
