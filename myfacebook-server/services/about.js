var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";


function handle_request(msg, callback){
	
	//console.log("ABOUT.JS In handle request of LOGIN:"+ msg.email);
	
	if(msg.type == "getabout"){

		getabout(msg, callback);
		return;
	}
	else if(msg.type == "insertwork"){
		
		insertwork(msg,callback);
		return;
	}
	else if(msg.type == "updatework"){
		
		updatework(msg,callback);
		return;
	}
	else if(msg.type == "inserteducation"){
		
		inserteducation(msg,callback);
		return;
	}
	else if(msg.type == "updateeducation"){
	
		updateeducation(msg,callback);
		return;
	}
	else if(msg.type == "updatecontact"){
		
		updatecontact(msg,callback);
		return;
	}
	else if(msg.type == "updateinterest"){
		
		updateinterest(msg,callback);
		return;
	}
	else{
		
		
	}
};


function insertwork(msg, callback){
	
	var res = {};
//	console.log("IN INSERTWORK FUNCTION");
	
	var json_responses;
	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);
	
	var coll = mongo.collection('userinfo');

	coll.update({_id: msg.email}, {$push : {work: msg.work}}, function(err, user){
		if (user) {

			res.user = user;								
		} 
		else {
			
			res.user = "empty";
		}
		callback(null, res);
		});
	});	
}


function updatework(msg, callback){
	
	var res = {};
//	console.log("IN UPDATEWORK FUNCTION");
	
	var json_responses;
	mongo.connect(mongoURL, function(){
	
	var coll = mongo.collection('userinfo');

	coll.update({_id: msg.email}, {$set:{work: msg.work}}, function(err, user){
		if (user) {

			res.user = user;								
		} 
		else {

			res.user = "empty";
		}
		callback(null, res);
		});
	});	
}


function inserteducation(msg, callback){
	
	var res = {};
//	console.log("IN INSERTWORK FUNCTION");
	
	var json_responses;
	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);
	
	var coll = mongo.collection('userinfo');

	coll.update({_id: msg.email}, {$push : {education: msg.education}}, function(err, user){
		if (user) {

			res.user = user;								
		} 
		else {
			
			res.user = "empty";
		}
		callback(null, res);
		});
	});	
}


function updateeducation(msg, callback){
	
	var res = {};
//	console.log("IN UPDATEWORK FUNCTION");
	
	var json_responses;
	mongo.connect(mongoURL, function(){
	
	var coll = mongo.collection('userinfo');

	coll.update({_id: msg.email}, {$set:{education: msg.education}}, function(err, user){
		if (user) {

			res.user = user;								
		} 
		else {

			res.user = "empty";
		}
		callback(null, res);
		});
	});	
}


function updatecontact(msg, callback){
	
	var res = {};
//	console.log("IN UPDATEWORK FUNCTION");
	
	var json_responses;
	mongo.connect(mongoURL, function(){
	
	var coll = mongo.collection('userinfo');

	coll.update({_id: msg.email}, {$set:{contact: msg.contact}}, function(err, user){
		if (user) {

			res.user = user;								
		} 
		else {

			res.user = "empty";
		}
		callback(null, res);
		});
	});	
}


function updateinterest(msg, callback){
	
	var res = {};
//	console.log("IN UPDATEWORK FUNCTION");
	
	var json_responses;
	mongo.connect(mongoURL, function(){
	
	var coll = mongo.collection('userinfo');

	coll.update({_id: msg.email}, {$set:{interest: msg.interest}}, function(err, user){
		if (user) {

			res.user = user;								
		} 
		else {

			res.user = "empty";
		}
		callback(null, res);
		});
	});	
}



function getabout(msg, callback){
	
	var res = {};
	//console.log("IN GETABOUT FUNCTION");
	
	var json_responses;
	mongo.connect(mongoURL, function(){
		//console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userinfo');
		
		coll.findOne({_id: msg.email}, function(err, results){
			
			//console.log("aboutinfo is " + JSON.stringify(results));
			if (results) {
				
				//console.log("IN ABOUT.JS " + results);
				res.result = results;								
			} 
			else {
				//console.log("SOME ERROR");
				res.result = "empty";
			}
			//console.log("GOING BACK FROM LOGIN");
			callback(null, res);
		});
	});	
}


exports.handle_request = handle_request;







