const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for users
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
  }
});

module.exports = User = mongoose.model("users", UserSchema);
