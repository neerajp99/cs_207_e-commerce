const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    isRequired: true
  },
  organisation: {
    type: String
  },
  bio: {
    type: String,
    isRequired: true
  },
  contact: {
    type: String,
    isRequired: true
  },
  address: {
    type: String,
    isRequired: true
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
