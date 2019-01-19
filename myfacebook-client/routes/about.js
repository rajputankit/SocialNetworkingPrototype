var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.index = function(req, res){
	
	if(req.session.email){
		
		var email = req.session.email + " via home session";
		//console.log("Session is : " + email);
		res.render("about");		
	}
	else{
		
		//console.log("in ELSE, NO SESSION");
		res.render("index");
	}	
};


exports.insertworkinfo = function(req,res){
	
	var email = req.session.email;
	var workinfo = req.body;
	
	var msg_payload = {"email": email, "type": 'insertwork', "work": {"company": workinfo.company, "designation": workinfo.designation, "location": workinfo.location}};
	
	mq_client.make_request('about_queue',msg_payload, function(err,results){
		
		//console.log(results);
		if(err){
			throw err;
		}
		else{
			
			//console.log("IN ABOUT.JS ELSE BLOCK");
			if(results.code == 200){
				
				res.end();
			}
			else{    
				
				res.end();
			}
		}  
	});		
};

exports.updateworkinfo = function(req,res){
	
	var email = req.session.email;
	var workinfo = req.body;
	
	//console.log("in UPDATEWORKINFO : " + workinfo);
	
	var msg_payload = {"email": email, "type": 'updatework', "work": workinfo};
	
	mq_client.make_request('about_queue',msg_payload, function(err,results){
		
		//console.log(results);
		if(err){
			throw err;
		}
		else{
			
			//console.log("IN ABOUT.JS ELSE BLOCK");
			if(results.code == 200){
				
				res.end();
			}
			else{    
				
				res.end();
			}
		}  
	});		
};


exports.inserteducationinfo = function(req,res){
	
	var email = req.session.email;
	var educationinfo = req.body;
	
	var msg_payload = {"email": email, "type": 'inserteducation', "education": {"university": educationinfo.university, "course": educationinfo.course, "major": educationinfo.major}};
	
	mq_client.make_request('about_queue',msg_payload, function(err,results){
		
		//console.log(results);
		if(err){
			throw err;
		}
		else{
			
			//console.log("IN ABOUT.JS ELSE BLOCK");
			if(results.code == 200){
				
				res.end();
			}
			else{    
				
				res.end();
			}
		}  
	});		
};


exports.updateeducationinfo = function(req,res){
	
	var email = req.session.email;
	var educationinfo = req.body;
	
	//console.log("in UPDATEEDUCATIONINFO : " + workinfo);
	
	var msg_payload = {"email": email, "type": 'updateeducation', "education": educationinfo};
	
	mq_client.make_request('about_queue',msg_payload, function(err,results){
		
		//console.log(results);
		if(err){
			throw err;
		}
		else{
			
			//console.log("IN ABOUT.JS ELSE BLOCK");
			if(results.code == 200){
				
				res.end();
			}
			else{    
				
				res.end();
			}
		}  
	});		
};


exports.updatecontactinfo = function(req,res){
	
	var email = req.session.email;
	var contactinfo = req.body;
	
	//console.log("in UPDATEEDUCATIONINFO : " + workinfo);
	
	var msg_payload = {"email": email, "type": 'updatecontact', "contact": contactinfo};
	
	mq_client.make_request('about_queue',msg_payload, function(err,results){
		
		//console.log(results);
		if(err){
			throw err;
		}
		else{
			
			//console.log("IN ABOUT.JS ELSE BLOCK");
			if(results.code == 200){
				
				res.end();
			}
			else{    
				
				res.end();
			}
		}  
	});		
};


exports.updateinterestinfo = function(req,res){
	
	var email = req.session.email;
	var interestinfo = req.body;
	
	console.log("in UPDATEinterestINFO : " + req.body);
	console.log("in UPDATEinterestINFO : " + JSON.stringify(req.body));
	console.log("in UPDATEinterestINFO : " + JSON.stringify(interestinfo));
	
	var msg_payload = {"email": email, "type": "updateinterest", "interest": interestinfo};
	
	mq_client.make_request('about_queue',msg_payload, function(err,results){
		
		//console.log(results);
		if(err){
			throw err;
		}
		else{
			
			//console.log("IN ABOUT.JS ELSE BLOCK");
			if(results.code == 200){
				
				res.end();
			}
			else{    
				
				res.end();
			}
		}  
	});		
};


exports.getaboutinfo = function(req,res){
	
	var email = req.session.email;
	
	var msg_payload = {"email": email, "type": 'getabout'};
	
	mq_client.make_request('about_queue',msg_payload, function(err,results){
		
		//console.log("CLIENT GETABOUTINFO " + results);
		if(err){
			throw err;
		}
		else{
			
			//console.log("GETABOUTINFO IN ABOUT.JS ELSE BLOCK GETABOUTINFO");
			if(results){
				
				//console.log("IN IF");
				res.end(JSON.stringify(results.result));
			}
			else{    
				
				res.end();
			}
		}  
	});		
};




