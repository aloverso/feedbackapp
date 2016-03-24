/* REQUIRES */
// ...npm
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ...local
var index = require('./routes/index.js');


/* CONNECT TO MONGOOSE */
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');


/* CONFIG APP */
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/* ROUTING */
app.get('/', index.video);
app.get('/getComments', index.getComments);
app.get('/getVideos', index.getVideos);
app.get('/:videoid', index.byVideo);

app.post('/newVideo', index.newVideo);
app.post('/newComment', index.newComment);
app.post('/newReply', index.newReply);

app.listen(process.env.PORT || 3000);
console.log("Running on port 3000");
