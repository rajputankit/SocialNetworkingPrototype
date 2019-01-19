var ejs = require("ejs");
var mq_client = require('../rpc/client');


exports.index = function(req, res){

	if(req.session.email){
		
		var email = req.session.email + " via index session";
		res.render("home", {emailid: email});		
	}
	else{
		res.render('index');
	}
};


exports.signin = function(req,res){
	
	//console.log("in Signin");
	var email = req.body.email;
	var password = req.body.password; 
	
	var emailcheck = /\S+@\S+\.\S+/;

	if(!emailcheck.test(email) || email == null){
		
		res.end();
		return;
	}	
	else if(password == null){
		
		res.end("password")
		return;
	}
	else{
		
		var msg_payload = {"email": email, "password": password};
		
		//console.log("In POST Request = email:"+ email+" "+password);
		
		mq_client.make_request('login_queue',msg_payload, function(err,results){
			
			//console.log(results);
			if(err){
				throw err;
			}
			else{
				
				//console.log("IN HOME.JS ELSE BLOCK");
				if(results.code == 200){
					//console.log("valid Login");
					req.session.email = email;
					req.session.fullname = results.fullname;
					//console.log(req.session.fullname);
					res.end("authorize");
				}
				else{    
					
					//console.log("Invalid Login");
					res.send("Invalid Email / Password");
				}
			}  
		});	
	}
};