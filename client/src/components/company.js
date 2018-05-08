import React, { Component } from "react";
import { browserHistory } from 'react-router';
import style from '../style';

export default class Company extends Component {
render() {
  return (
    <div id="company" style={ style.user }>
      This is the company page!
    </div>
  );
}
}
