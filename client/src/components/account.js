import React, { Component } from 'react';
import axios from 'axios';
import MyNavbar from './homeNavbar';
import '../style.css';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: sessionStorage.getItem("user")
    }
  }

  render() {
    return (
      <div className="account">
        <MyNavbar />


      </div>
    );
  }
}
