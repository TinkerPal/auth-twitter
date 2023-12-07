const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String,
  twitterAccess: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
