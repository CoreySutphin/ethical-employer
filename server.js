const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var UserSchema = require('./models/userSchema');
var CompanySchema = require('./models/companySchema');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// Connect to our MLab Database
mongoose.connect('mongodb://corey:admin@ds229609.mlab.com:29609/ethical_employer', function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

// Handles when a user attempts authentication, checks the password against the hashed password in DB
app.post('/api/auth', (req, res) => {
  let userEmail = req.body.email;
  let password = req.body.password;

  // fetch user and test password verification
  UserSchema.findOne({ email: userEmail }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
        res.json({ user: user.email });
    });
  });
});

// Handles account creation, pushes new email and encrypted password into database
app.post('/api/users', (req, res) => {
  let userEmail = req.body.email;
  let password = req.body.password;

  let userInstance = new UserSchema({email: userEmail, password: password});
  userInstance.save(function(err) {
    if (err) console.log(err);
    else res.send("Account created!");
  });
});

// Gets all companies in the database and sends them to the requester as JSON
app.get('/api/companies', (req, res) => {
  CompanySchema.find({}, (err, result) => {
    if (err) throw error;
    res.json(result);
  });
});

// Matches a specific company based on its 'tag', which should just be the company name
app.get(/^\/api\/companies\/(.+)/, (req, res) => {
  var companyString = req.params[0];
  CompanySchema.findOne({ tag: companyString }, function(err, company) {
    res.json({companyData: company});
  });
});

// Adds a new review for a company
app.post('/api/companies', (req, res) => {
  CompanySchema.findOne({ tag: req.body.tag }, function(err, company) {
    var newRatings = company.ratings;
    var totalReviews = company.total_reviews + 1;
    newRatings.inclusiveness += req.body.inclusiveness;
    newRatings.compensation += req.body.compensation;
    newRatings.balance += req.body.balance;
    newRatings.advancement_opp += req.body.advancement_opp;

    CompanySchema.findOneAndUpdate({ tag: req.body.tag }, { ratings: newRatings, total_reviews: totalReviews },
       function(err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
