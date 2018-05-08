import React, { Component } from "react";
import { browserHistory } from 'react-router';
import axios from 'axios';
import style from '../style';
import DefaultNavbar from './defaultNavbar';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: []
    }
  }

  componentDidMount() {
    axios.get('localhost:5000/company')
      .then(res => {
        const companies = res.data;
      })
  }

  render() {
    return (
      <div id="search" style={ style.search }>
        <DefaultNavbar />
        This is the search page!
      </div>
    );
  }
}
