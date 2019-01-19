var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , home = require('./routes/home')
  , friends = require('./routes/friends')
  , about = require('./routes/about')
  , group = require('./routes/group')
  , signup = require('./routes/signup')
  , mongo = require("./routes/mongo")
  , path = require('path');


var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
//app.use(express.session({ secret: 'keyboard cat', duration: 30 * 60 * 1000}));
var mongoSessionConnectURL = "mongodb://localhost:27017/myfacebook";
app.use(expressSession({
	secret: 'keyboard cat',
	resave: false,  			//don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));



app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/signin', routes.signin);
app.post('/signup', signup.register);

app.get('/home', home.index);
app.get('/getusername', home.getusername);

app.get('/about', about.index);
app.get('/aboutinfo', about.getaboutinfo);
app.post('/insertworkinfo', about.insertworkinfo);
app.post('/updateworkinfo', about.updateworkinfo);
app.post('/inserteducationinfo', about.inserteducationinfo);
app.post('/updateeducationinfo', about.updateeducationinfo);
app.post('/updatecontactinfo', about.updatecontactinfo);
app.post('/updateinterestinfo', about.updateinterestinfo);

app.post('/poststatus', home.poststatus);
app.get('/getstatus', home.getstatus);

app.get('/creategroup', group.index);
app.post('/creategroup', group.creategroup);
app.get('/grouppage', function(req,res){res.render("grouppage");});
app.get('/groupdetails', group.groupdetails);
app.post('/searchmembers', group.searchmembers);
app.post('/addmember', group.addmember);
app.post('/deletemember', group.deletemember);
app.get('/getusergroups', group.getusergroups);
app.post('/togroup', function(req,res){req.session.currentgroupid = req.param("groupid");res.end();});
app.post('/deletegroup', group.deletegroup);




app.get('/friends', function(req,res){res.render("friends");});
app.post('/searchfriends', friends.searchfriends);
app.get('/searchfriends', friends.searchfriendslist);
app.post('/sendfriendrequest', friends.sendfriendrequest);
app.get('/getfriends',friends.getfriends);

app.get('/notification', function(req,res){res.render("notification");});
app.get('/notificationcount', friends.notificationcount);
app.get('/getfriendrequests', friends.getfriendrequests);
app.post('/confirmfriendrequest', friends.confirmfriendrequests);

app.get('/signout',routes.index);
app.post('/signout', function(req,res){
	
	req.session.destroy();	
	console.log("Session destroyed");
	//res.end();
	res.render("index");
});


mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
});
