var ejs = require("ejs");
var mq_client = require('../rpc/client');



exports.index = function(req, res){
	
	if(req.session.email){
		
		var email = req.session.email + " via home session";
		//console.log("Session is : " + email);
		res.render("home", {emailid: req.session.email});		
	}
	else{
		
		//console.log("in ELSE, NO SESSION");
		res.render("index");
	}	
};

exports.getusername = function(req,res){
	
	res.end(req.session.fullname);
	
};


exports.poststatus = function(req,res){
	
	var msg_payload = {"email": req.session.email, "fullname": req.session.fullname, "status": req.param("status"), "type": "poststatus"};

	mq_client.make_request('friends_queue',msg_payload, function(err,results){

		//console.log("in POSTSTATUS : " + JSON.stringify(results));
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



exports.getstatus = function(req,res){
	
	var msg_payload = {"email": req.session.email, "type": "getstatus"};

	mq_client.make_request('friends_queue',msg_payload, function(err,results){

		//console.log("in GETSTATUS : " + JSON.stringify(results));
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











