var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.index = function(req, res){
	
	if(req.session.email){
		
		var email = req.session.email + " via home session";
		res.render("about");		
	}
	else{
		
		res.render("index");
	}	
};


exports.searchfriends = function(req,res){

	req.session.searchtext = req.param("searchtext");
	res.render("searchfriends");	
};


exports.searchfriendslist = function(req,res){
	
	var msg_payload = {"searchtext": req.session.searchtext, "type": "searchpeople"};
	
	mq_client.make_request('friends_queue',msg_payload, function(err,results){
		
		//console.log("in SEARCHFRIENDS : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			//console.log("IN FRIENDS.JS ELSE BLOCK");
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{    
				
				res.end("null");
			}
		}   
	});		
};


exports.sendfriendrequest = function(req,res){
	
	var msg_payload = {"sourceemail": req.session.email, "destinationemail" : req.param("friendemail"), "type": "sendfriendrequest"};
	
	mq_client.make_request('friends_queue',msg_payload, function(err,results){
		
		if(err){
		
			throw err;
		}
		else{
			
			//console.log("IN FRIENDS.JS ELSE BLOCK");
			if(results.code == "200"){
				
				res.end();
			}
			else{    
				
				res.end("null");
			}
		}   
	});		
};



exports.getfriendrequests = function(req,res){
	
	var msg_payload = {"email": req.session.email, "type": "getfriendrequests"};
	
	mq_client.make_request('friends_queue',msg_payload, function(err,results){
		
		//console.log("list of friend requests : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			if(results!= "null"){
				
				res.end(JSON.stringify(results));
			}
			else{    
				
				res.end("null");
			}
		}   
	});		
};



exports.confirmfriendrequests = function(req,res){
	
	
	var msg_payload = {"email": req.session.email, "friendemail": req.param("friendemail"), "type": "confirmfriendrequest"};
	
	mq_client.make_request('friends_queue',msg_payload, function(err,results){
		
		if(err){
		
			throw err;
		}
		else{
			
			if(results!= "null"){
				
				res.end(JSON.stringify(results));
			}
			else{    
				
				res.end("null");
			}
		}   
	});		
};



exports.getfriends = function(req,res){
	
	var msg_payload = {"email": req.session.email, "type": "getfriends"};
	
	mq_client.make_request('friends_queue',msg_payload, function(err,results){
		
		//console.log("in getfriends : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{    
				
				res.end("null");
			}
		}   
	});		
};



exports.notificationcount = function(req,res){
	
	var msg_payload = {"email": req.session.email, "type": "notificationcount"};
	
	mq_client.make_request('friends_queue',msg_payload, function(err,results){
		
		//console.log("in notificationcount : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			//console.log("IN FRIENDS.JS ELSE BLOCK");
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{    
				
				res.end("null");
			}
		}   
	});		
};


