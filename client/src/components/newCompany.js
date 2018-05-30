import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import '../style.css';

export default class NewCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  render() {
    return (
      <div id="newcompany">
        This is the newcompany page!

        <div className="slider-horizontal">
          <Slider
            min={0}
            max={10}
            value={ this.state.value }
            orientation='horizontal'
            onChange={ this.handleChange }
          />
        </div>

      </div>
    );
  }
}
