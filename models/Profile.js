const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfile = new Schema({
  userId: {
    type: Object,
    required: true
  },

  image: {
    type: String
  },
	name: {
		type: String
	},
	phone: {
		type: String
	},
  adress: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', UserProfile);