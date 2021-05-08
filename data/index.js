const userData = require('./users');
const loginData = require('./login');
const logoutData = require('./logout');
const apartmentListingData = require('./apartmentListings');
const reviewData = require('./reviews');

module.exports = {
  users: userData,
  login: loginData,
  logout: logoutData,
  apartmentListings: apartmentListingData,
  reviews: reviewData
};