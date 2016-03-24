var mongoose = require("mongoose");

var videoSchema = mongoose.Schema({
  name: String,
  url: String,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model("Video", videoSchema);
