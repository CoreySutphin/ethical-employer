import React, { Component } from "react";
import { browserHistory } from 'react-router';
import axios from 'axios';
import style from '../style';

export default class User extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div id="user" style={ style.user }>
        This is the user page!
      </div>
    );
  }
}
