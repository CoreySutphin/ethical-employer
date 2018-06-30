import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import axios from 'axios';
import MyNavbar from './homeNavbar';
import { Circle } from 'rc-progress';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import '../style.css';

export default class Company extends Component {
  constructor(props) {
    super(props);
    var companyPath = this.props.location.pathname;
    var companyString = companyPath.match(/\/company(\/?)(.*)/)[2];

    this.state = {
      company: companyString,
      companyData: {},
      ratings: {},
      companyImage: "",
      sentimentData: {},
      popularTweet: ""
    }

  }

  componentDidMount() {
    var company = this.state.company;
    axios.get('/api/companies/' + company)
      .then(res => {
        this.setState({
          companyData: res.data.companyData,
          ratings: res.data.companyData.ratings
        });
      });

    axios.post('/api/twitter', {tag: company})
      .then(res => {
        this.setState({
          sentimentData: res.data.sentimentData,
          popularTweet: res.data.popularTweet
        });
      });


  }

  // As soon as the company's most popular tweet is loaded, embed it into the page
  renderTweet = () => {
    while (this.state.popularTweet === "") {
      return;
    }
    document.getElementById("tweet-container").innerHTML = this.state.popularTweet.html;
    window.twttr.widgets.load(
      document.getElementById("tweet-container")
    );
  }

  render() {

    var avatarUrl = "https://avatars.io/twitter/" + this.state.companyData.tag + "/medium";

    var totalReviewScore = this.state.companyData.total_reviews * 10;
    var inclusivenessRating = Math.round(this.state.ratings.inclusiveness/totalReviewScore *10);
    var compensationRating = Math.round(this.state.ratings.compensation/totalReviewScore *10);
    var balanceRating = Math.round(this.state.ratings.balance/totalReviewScore *10);
    var advancementRating = Math.round(this.state.ratings.advancement_opp/totalReviewScore *10);

    const data = [
      {name: "positive tweets", value: this.state.sentimentData.positive, fill: "DodgerBlue"},
      {name: "negative tweets", value: this.state.sentimentData.negative, fill: "purple"},
      {name: "neutral tweets", value: this.state.sentimentData.neutral, fill: "green"}
    ];

    return (
      <div className="company">
        <MyNavbar />

        <Col sm={12} style={{ backgroundColor: "", height: "150px" }}>
          <img src={ avatarUrl } alt={ this.state.companyData.tag }
            className="center-block" />
        </Col>

        <Col sm={12} style={{ backgroundColor: "white", height: "300px" }}>

          <Col sm={3}>
            <h2 align="center">Inclusiveness</h2>
            <h3 align="center">{inclusivenessRating}/10</h3>
            <div align="center">
              <Circle
                percent={ inclusivenessRating * 10 }
                strokeWidth="10"
                trailWidth="10"
                height={ 150 }
                strokeColor="#A4D555"
              />
            </div>
          </Col>

          <Col sm={3}>
            <h2 align="center">Compensation</h2>
            <h3 align="center">{ compensationRating }/10</h3>
            <div align="center">
              <Circle
                percent={ compensationRating* 10 }
                strokeWidth="10"
                trailWidth="10"
                height={ 150 }
                strokeColor="#A4D555"
              />
             </div>
          </Col>

          <Col sm={3}>
            <h2 align="center">Balance</h2>
            <h3 align="center">{balanceRating}/10</h3>
            <div align="center">
              <Circle
                percent={ balanceRating * 10 }
                strokeWidth="10"
                trailWidth="10"
                height={ 150 }
                strokeColor="#A4D555"
              />
            </div>
          </Col>


          <Col sm={3}>
            <h2 align="center">Advancement</h2>
            <h3 align="center">{advancementRating}/10</h3>
            <div align="center">
              <Circle
                percent={ advancementRating * 10 }
                strokeWidth="10"
                trailWidth="10"
                height={ 150 }
                strokeColor="#A4D555"
              />
            </div>
          </Col>

        </Col>

        <Col sm={12} style={{ backgroundColor: "", height: "75px" }}>

        </Col>

        <Col sm={6} style={{ border: "2px solid #EAE3EA", paddingTop: "50px", height: "600px" }}>

          <div align="center">
            <h2 align="center">From the past 100 tweets about { this.state.companyData.tag },
              { " " + this.state.sentimentData.positive } tweets were perceived as positive.</h2>
            <PieChart width={800} height={400}>
              <Pie isAnimationActive={false} data={data} dataKey={"value"} nameKey={"name"}
                cx={200} cy={200} outerRadius={120} label/>
              <Tooltip />
            </PieChart>
          </div>

        </Col>

        <Col sm={6} style={{ border: "2px solid #EAE3EA", paddingTop: "50px", height: "600px" }}>
          <h2 align="center">Most popular tweet involving { this.state.companyData.tag + " " }
            from the past seven days.</h2>
          <div align="center" id="tweet-container" className="tweet-container">
            { this.renderTweet() }
          </div>


        </Col>

      </div>
    );
  }
}
