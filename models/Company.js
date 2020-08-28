const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  userId: {
    type: Object,
    required: true
  },

  "companyName": { type: String },
  "adress": { type: String },
  "departaments": [
    {
      "departamentName": { type: String },
      "departamentLeader": { type: String },
      "departamentEmployees": []
    }
  ]
})