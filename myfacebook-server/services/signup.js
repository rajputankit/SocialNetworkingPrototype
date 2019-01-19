var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";
var crypto    = require('crypto');


function handle_request(msg, callback){
	
	var res = {};
	//console.log("In handle request of SIGNUP:"+ msg.email);

	mongo.connect(mongoURL, function(){
		//console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userinfo');
		
		
		var password =  crypto.createHash('sha1').update(msg.password).digest("hex");
		console.log("After encryption : " + password);
		password =  crypto.createHash('sha512').update(msg.password).digest("hex");
		
		
		
		coll.insert({_id: msg.email, password: password, firstname: msg.firstname, lastname: msg.lastname, gender: msg.gender, dateofbirth: msg.dateofbirth, contact:{"email":msg.email, "phone":"", "address": ""}}, function(err, user){
//			if (user) {
//				// This way subsequent requests will know the user is logged in.
//				req.session.username = user.username;
//				console.log(req.session.username +" is the session");
//				json_responses = {"statusCode" : 200};
//				res.send(json_responses);
//
//			} else {
//				console.log("returned false");
//				json_responses = {"statusCode" : 401};
//				res.send(json_responses);
//			}
			//console.log("RESULT OF SIGNUP : " + JSON.stringify(user));
			
			
			//console.log("Received following data from client");
			//console.log(msg.email + " " + msg.password);
			res.code = "200"; 
			callback(null, res);
		});
	});
}

exports.handle_request = handle_request;