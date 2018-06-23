import React, { Component } from 'react';
import axios from 'axios';
import '../style.css';

export default class NewCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  render() {
    return (
      <div id="newcompany">
        This is the newcompany page!

      </div>
    );
  }
}
