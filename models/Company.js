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
      "departamentManager": { type: String },
      "departamentEmployees": []
    }
  ],
  "labelStatus": [
    {
      "labelPriority": {type: Number},
      "statusName": {type: String},
      "color": {type: String}
    }
  ]
});

module.exports = Company = mongoose.model('company', CompanySchema);
