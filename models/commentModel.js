var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  user: String,
  text: String,
  desc: String,
  timestamp: String,
  category: String,
  replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reply'}]
});

module.exports = mongoose.model("Comment", commentSchema);
