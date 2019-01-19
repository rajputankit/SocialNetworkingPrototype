var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";
var crypto    = require('crypto');


function handle_request(msg, callback){
	
	var res = {};
	//console.log("In handle request of LOGIN:"+ msg.email);

	
	var json_responses;
	mongo.connect(mongoURL, function(){
		console.log('LOGIN.JS Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userinfo');

		var password =  crypto.createHash('sha512').update(msg.password).digest("hex");
		console.log("In LOGIN server after encrypting login password : " + password);		
		
		coll.findOne({_id: msg.email, password: password}, {}, function(err, user){
			if (user) {
				
				//console.log(user);
				res.code = "200";
				res.value = "Success Login";
				res.fullname = user.firstname + " " + user.lastname; 
				//console.log("IN LOGIN IN IF");				
			} 
			else {
				//console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";
			}
			//console.log("GOING BACK FROM LOGIN");
			callback(null, res);
		});
	});	
}


exports.handle_request = handle_request;







