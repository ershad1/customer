const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  gender: {type: String},
  dob: {type: Date},
  country: {type: String},
  maritalStatus: {type: String},
  street: {type: String},
  city: {type: String},
  // contacts: { type: String, required: true },
  primaryPhone: {type: String},
  primaryEmail: {type: String}

});

module.exports = mongoose.model('Customer', postSchema);
