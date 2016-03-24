var routes = {};
var util = require('util');
var Video = require('./../models/videoModel.js');
var Comment = require('./../models/commentModel.js');
var Reply = require('./../models/replyModel.js');

routes.video = function(req, res) {
  // TODO: get first video in list

  // console.log(req.query);

  // var videoID = req.params.videoID; // This could also be name. That might be more useful for our demo, but this is more robust.
  //var tempID = '56ec6d6a4c0fb046a0f5f182';
  // Find Video information, populating comments and replies. Pass to handlebars.
  // Video.find({_id: tempID})
  // .populate({path: 'comments', model: 'Comment',
  // populate:{path: 'replies', model: 'Reply'}})
  // .exec(function(err, video) {console.log(util.inspect(video, false, null));});

  // else {
    Video.findOne()
    .populate({path: 'comments', model: 'Comment',
    populate:{path: 'replies', model: 'Reply'}})
    .exec(function(err, video) {
      if (video) {
        //console.log(video);
        console.log(video.comments);
        var l = video.url.length;
        var newsrc = 'https://www.youtube.com/embed/' + video.url.substring(l-11,l) + '?enablejsapi=1';
        res.render('home', {vidsrc: newsrc, vidid: video._id});

        //console.log(util.inspect(video, false, null));
      }
      else {
         res.render('home', {vidsrc: "", vidid: ""});
      }
    });
  // }
 
},

routes.newVideo = function(req, res) {
  var video = {};
  video.name = req.body.name;
  video.url = req.body.url;

  var saveVideo = new Video(video);

  saveVideo.save(function(err) {
    if (err) {console.log('err:', err);}
    else {console.log('save success');}
  });

  video.id = saveVideo._id;
  res.send(video);
},

routes.newComment = function(req, res) {
  var videoID = req.body.videoID;
  var comment = {};
  comment.user = req.body.user;
  comment.text = req.body.text;
  comment.desc = req.body.desc;
  comment.timestamp = req.body.timestamp;
  comment.category = req.body.category;
  console.log('comment', comment);
  // Save comment and get comment _id
  var saveComment = new Comment(comment);

  saveComment.save(function(err) {
    if (err) {console.log('err:', err);}
    else {
      // Add comment _id to Video's list of comments
      Video.findOneAndUpdate({_id: videoID},
        {$push: {comments: {_id: saveComment._id}}},
        {safe: true, upsert: true, new: true},
        function(err) {console.log('err updating video comments', err);}
      );
    }
  });

  comment.id = saveComment._id;

  console.log(comment.id);
  res.send(comment);
},

routes.newReply = function(req, res) {
  var commentID = req.body.commentID;
  console.log(commentID);

  //var tempID = '56ec6dbb04491258a00f3377'; // This will also be a capture of the comment ID, we may want to make mongoose _id a class in Handlebars
  // Save reply and get reply _id
  var replyObj = {};
  replyObj.name = req.body.name;
  replyObj.reply = req.body.reply;

  var saveReply = new Reply(replyObj);

  saveReply.save(function(err){
    if (err) {
      console.log('error saving reply');
    } else {
      // Add reply to Comment's list of replies
      Comment.findOneAndUpdate({_id: commentID},
        {$push: {replies: {_id: saveReply._id}}},
        {safe: true, upsert: true, new: true},
        function(err) {console.log('err updating comment replies', err);}
      );
    }
  });

  res.send(replyObj);
},

routes.getComments = function(req, res) {
  videoID = req.query.videoID;
  console.log(videoID);
  Video.findOne({'_id': videoID})
  .populate({path: 'comments', model: 'Comment',
  populate:{path: 'replies', model: 'Reply'}})
  .exec(function(err, video) {
    if (video) {
      console.log(video.comments);
      res.json(video.comments);
    }
  });
},

routes.getVideos = function(req, res) {
  Video.find()
  .exec(function(err, videos) {
    res.json(videos);
  });
},

routes.byVideo = function(req, res) {
  if (req.params.videoid) {
    Video.findOne({'_id': req.params.videoid})
    .populate({path: 'comments', model: 'Comment',
    populate:{path: 'replies', model: 'Reply'}})
    .exec(function(err, video) {
      if (video) {
        //console.log(video);
        console.log(video.comments);
        var l = video.url.length;
        var newsrc = 'https://www.youtube.com/embed/' + video.url.substring(l-11,l) + '?enablejsapi=1';
        res.render('home', {vidsrc: newsrc, vidid: video._id});
        console.log("HELLLLLLLA");
        //console.log(util.inspect(video, false, null));
      }
    });
  }
}

module.exports = routes;
