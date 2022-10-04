const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
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

module.exports = mongoose.model('transaction', userSchema);
