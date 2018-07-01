import React, { Component } from 'react';
import { Col, Row, Grid, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import MyNavbar from './homeNavbar';
import Slider from 'react-rangeslider';
import autoComplete from '../autoComplete.js'
import 'react-rangeslider/lib/index.css';
import '../style.css';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      inclusivenessValue: 0,
      compensationValue: 0,
      balanceValue: 0,
      advancementValue: 0,
      companyValue: "",
      showAlert: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.autoComplete = autoComplete.bind(this);
  }

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

  validateForm = () => {
    if (this.state.inclusivenessValue === 0 || this.state.compensationValue === 0
       || this.state.balanceValue === 0 || this.state.advancementValue === 0
       || this.state.companyValue === "") {
      return false;
    } else {
      return true;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    var data = {
      tag: document.getElementById("companyInput").value,
      inclusiveness: this.state.inclusivenessValue,
      compensation: this.state.compensationValue,
      balance: this.state.balanceValue,
      advancement_opp: this.state.advancementValue
    }

    axios.post('/api/companies', data)
      .then(res => {
        if (res.data === "Failure") {
          this.setState({
            showAlert: true
          });
          document.getElementById("companyInput").value = "";
        }
        else {
          this.props.history.push('/');
        }
      });
  }

  handleChange = (e) => {
    this.setState({
      companyValue: e.target.value
    });
  }

  handleInclusivenessSliderChange = value => {
    this.setState({
      inclusivenessValue: value
    });
    var slider = this.refs.inclusivenessSlider;
    this.updateSliderColor(slider, value);
  }

  handleCompensationSliderChange = value => {
    this.setState({
      compensationValue: value
    });
    var slider = this.refs.compensationSlider
    this.updateSliderColor(slider, value);
  }

  handleBalanceSliderChange = value => {
    this.setState({
      balanceValue: value
    });
    var slider = this.refs.balanceSlider;
    this.updateSliderColor(slider, value);
  }

  handleAdvancementSliderChange = value => {
    this.setState({
      advancementValue: value
    });
    var slider = this.refs.advancementSlider;
    this.updateSliderColor(slider, value);
  }

  updateSliderColor = (slider, value) => {
    if (value >= 0 && value < 4) {
      slider.slider.firstChild.style.backgroundColor = "red";
    } else if (value >= 4 && value < 7) {
      slider.slider.firstChild.style.backgroundColor = "yellow";
    } else {
      slider.slider.firstChild.style.backgroundColor = "green";
    }
  }

  createAlert = () => {
    while (!this.state.showAlert) {
      return;
    }

    var errorMessage = "We couldn't find that company, try checking the spelling and capitilization.";
    return (
      <Alert bsStyle="danger">
        <p align="center">{ errorMessage }</p>
      </Alert>
    );
  }

  render() {

    const labels = {
      1: "Terrible",
      5: "Average",
      10: "Outstanding"
    }

    return (
      <div className="review">
        <MyNavbar />

        <Grid>

          <Row>

            <Col xs={12} mdOffset={2} md={8}>
              <div className="review-box">

                { this.createAlert() }

                <h1 align="center">Leave a Review</h1>

                <h3 align="center">Please tell us the company you are reviewing</h3>

                <Row>

                  <Col xsOffset={2} xs={8} mdOffset={4} md={4}>
                    <form autoComplete="off">
                      <div className="autocomplete" style={{ width: '100%', border: "1px solid gray", paddingTop: "0px"}}>
                        <input id="companyInput" className="company-search-text" type="text"
                          placeholder="Enter a company..." onChange={ this.handleChange }/>
                      </div>
                    </form>
                  </Col>

                </Row>

                <Row>

                  <Col xs={12} md={2} mdOffset={1}>
                    <h3 align="center">Inclusiveness</h3>
                  </Col>

                  <Col xsOffset={2} xs={8} md={5}>
                    <div>
                      <Slider
                        min={ 1 }
                        max={ 10 }
                        value={ this.state.inclusivenessValue }
                        orientation="horizontal"
                        labels={ labels }
                        onChange={ this.handleInclusivenessSliderChange }
                        ref="inclusivenessSlider"
                      />
                    </div>
                  </Col>

                </Row>

                <Row>

                  <Col xs={12} md={2} mdOffset={1}>
                    <h3 align="center">Compensation</h3>
                  </Col>

                  <Col xsOffset={2} xs={8} md={5}>
                    <div>
                      <Slider
                        min={ 1 }
                        max={ 10 }
                        value={ this.state.compensationValue }
                        orientation="horizontal"
                        labels={ labels }
                        onChange={ this.handleCompensationSliderChange }
                        ref="compensationSlider"
                      />
                    </div>
                  </Col>

                </Row>

                <Row>

                  <Col xs={12} md={2} mdOffset={1}>
                    <h3 align="center">Balance</h3>
                  </Col>

                  <Col xsOffset={2} xs={8} md={5}>
                    <div>
                      <Slider
                        min={ 1 }
                        max={ 10 }
                        value={ this.state.balanceValue }
                        orientation="horizontal"
                        labels={ labels }
                        onChange={ this.handleBalanceSliderChange }
                        ref="balanceSlider"
                      />
                    </div>
                  </Col>

                </Row>

                <Row>

                  <Col xs={12} md={2} mdOffset={1}>
                    <h3 align="center">Advancement Opportunities</h3>
                  </Col>

                  <Col xsOffset={2} xs={8} md={5}>
                    <div>
                      <Slider
                        min={ 1 }
                        max={ 10 }
                        value={ this.state.advancementValue }
                        orientation="horizontal"
                        labels={ labels }
                        onChange={ this.handleAdvancementSliderChange }
                        ref="advancementSlider"
                      />
                    </div>
                  </Col>

                </Row>

                <Form onSubmit={ this.handleSubmit } style={{ paddingTop: "30px" }}>
                  <Button block type="submit" disabled={!this.validateForm()} bsStyle="success" style={{ height: "50px" }}>
                    Submit Review
                  </Button>
                </Form>

              </div>
            </Col>

          </Row>

        </Grid>

      </div>
    );
  }
}
