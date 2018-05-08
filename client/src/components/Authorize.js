import React, { Component } from 'react';
import { isLoggedIn } from '../authUtils';

export default class Authorize extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        isLoggedIn()
          ? <this.props.component />
          ? <h1>You must login to access this</h1>
      </div>
    );
  }
}
