import React, { Component } from "react";
import { browserHistory } from 'react-router';
import style from '../style';

export default class NewCompany extends Component {
  render() {
    return (
      <div id="newcompany" style={ style.newcompany }>
        This is the newcompany page!
      </div>
    );
  }
}
