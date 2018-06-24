import React, { Component } from 'react';
import { Button, Form, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import HomeNavbar from './homeNavbar';
import Login from './login';
import autoComplete from '../autoComplete.js';
import '../style.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      showAlert: false
    }
    this.autoComplete = autoComplete.bind(this);
    this.handleCompanySearchButtonClick = this.handleCompanySearchButtonClick.bind(this);
  }

  // When component renders, get list of company tags for search autocomplete function
  componentDidMount() {
    axios.get('/api/companies')
      .then(res => {
        let companyArray = res.data;
        let companyTags = [];
        for(let i = 0; i < companyArray.length; i++) {
          companyTags.push(companyArray[i].tag);
        }
        this.setState({
          companies: companyTags
        });
        this.autoComplete(this.state.companies, "companyInput");
      });
  }

  handleCompanySearchButtonClick() {
    var input = document.getElementById("companyInput").value;
    if (this.state.companies.includes(input)){
      var path = "/company/" + input;
      this.props.history.push(path);
    }
    else {
      this.setState({
        showAlert: true
      });
    }
  }

  createAlert = () => {
    while (!this.state.showAlert) {
      return;
    }

    var company = document.getElementById("companyInput").value
    var errorMessage = "We don't have any info about " + company
      + ".  Maybe you could help us by ";
    return (
      <Alert bsStyle="danger" style={{ width: "400px" }}>
        <p align="center">{ errorMessage }<a href='/review'>leaving a review?</a></p>
      </Alert>
    );
  }

  render() {
    return(
      <div className="home">
        <HomeNavbar />

        <Col smOffset={3} sm={6}>
          <h1 className="home-header" align="center">Ethical Employer lets you see the true face of a company.</h1>
          <h3 align='center'>Ethical Employer presents unbiased reviews of a company based on metrics
            that matter.</h3>
        </Col>

        <Col smOffset={4} sm={4}>
          <form autoComplete="off">
            <div className="autocomplete" style={{width: '300px'}}>
              <input id="companyInput" className="company-search-text" type="text" placeholder="Search for companies..."/>
            </div>
            <input type="button" onClick={ this.handleCompanySearchButtonClick }
              value="Search" className="company-search-btn" style={{ width: "100px" }}/>
          </form>
          { this.createAlert() }
        </Col>
      </div>
    );
  }
}
