const { mongoose } = require("mongoose");
const UserScheme = mongoose.Schema(
  {
    _id: String,
    name: String,
    email: String,
  },
  {
    collection: "users",
  }
);

module.exports = UserScheme;
