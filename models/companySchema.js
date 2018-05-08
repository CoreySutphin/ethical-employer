'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CompanySchema = new Schema ({
  tag: String,
  ratings: {
    inclusiveness: Number,
    compensation: Number,
    balance: Number,
    advancement_opp: Number
  },
  links: [{url: String, date: Date}]
});

module.exports = mongoose.model("Company", CompanySchema, "companies");
