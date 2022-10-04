const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
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

module.exports = mongoose.model('users', userSchema);
