import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import logo from '../logo.svg';

import Home from './home';
import Company from './company';
import Login from './login';
import NewCompany from './newCompany';
import Search from './search';
import User from './user';
import SignUp from './signUp';

class App extends Component {
  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/company' component={Company}/>
            <Route path='/login' component={Login}/>
            <Route path='/newcompany' component={NewCompany}/>
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
