var mongoose = require("mongoose");

var replySchema = mongoose.Schema({
  name: String,
  reply: String
});

module.exports = mongoose.model("Reply", replySchema);
