const UserScheme = require("../schemes/user.scheme");
const mongoose = require("mongoose");

const UserModel = mongoose.model("User", UserScheme);

module.exports = UserModel;
