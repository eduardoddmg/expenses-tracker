const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  idUser: {
    type: String,
    required: true
  }
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});

module.exports = mongoose.model('contacts', contactSchema);