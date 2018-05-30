import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import axios from 'axios';
import MyNavbar from './homeNavbar';
import { Circle } from 'rc-progress';
import '../style.css';

export default class Company extends Component {
  constructor(props) {
    super(props);
    var companyPath = this.props.location.pathname;
    var companyString = companyPath.match(/\/company(\/?)(.*)/)[2];

    this.state = {
      company: companyString,
      companyData: {},
      ratings: {}
    }

    this.increaseProgressBars = this.increaseProgressBars.bind(this);
  }

  componentDidMount() {
    var company = this.state.company;
    axios.get('/api/companies/' + company)
      .then(res => {
        console.log(res.data.companyData);
        this.setState({
          companyData: res.data.companyData,
          ratings: res.data.companyData.ratings
        });
      });
    //this.increaseProgressBars();
  }

  increaseProgressBars() {
    var arr = {
      inclusivenessPercent: 50,
      compensationPercent: 70,
      balancePercent: 30,
      advancementPercent: 90
    }
    this.setState({
      ratings: arr
    });
  }

  render() {

    var totalReviewScore = this.state.companyData.total_reviews * 10;

    return (
      <div className="company">
        <MyNavbar />

        <Col smOffset={3} sm={6} style={{ backgroundColor: "" }}>
          <h1 align="center" style={{ fontSize: "64px" }}>{ this.state.companyData.tag }</h1>
        </Col>

        <Col sm={12} style={{ backgroundColor: "white" }}>

          <Col sm={3}>
            <h1 align="center">Inclusiveness</h1>
            <h3 align="center">{this.state.ratings.inclusiveness/totalReviewScore * 10}/10</h3>
            <Circle
              percent={ this.state.ratings.inclusiveness/totalReviewScore * 100 }
              strokeWidth="4"
              trailWidth="3"
              strokeColor="DodgerBlue"
            />
          </Col>

          <Col sm={3}>
            <h1 align="center">Compensation</h1>
            <h3 align="center">{this.state.ratings.compensation/totalReviewScore * 10}/10</h3>
            <Circle
              percent={ this.state.ratings.compensation/totalReviewScore * 100 }
              strokeWidth="4"
              trailWidth="3"
              strokeColor="DodgerBlue"
             />
          </Col>

          <Col sm={3}>
            <h1 align="center">Balance</h1>
            <h3 align="center">{this.state.ratings.balance/totalReviewScore * 10}/10</h3>
            <Circle
              percent={ this.state.ratings.balance/totalReviewScore * 100 }
              strokeWidth="4"
              trailWidth="3"
              strokeColor="DodgerBlue"
            />
          </Col>

          <Col sm={3}>
            <h1 align="center">Advancement</h1>
            <h3 align="center">{this.state.ratings.advancement_opp/totalReviewScore * 10}/10</h3>
            <Circle
              percent={ this.state.ratings.advancement_opp/totalReviewScore * 100 }
              strokeWidth="4"
              trailWidth="3"
              strokeColor="DodgerBlue"
             />
          </Col>

        </Col>
      </div>
    );
  }
}
