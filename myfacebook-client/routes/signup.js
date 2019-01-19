var ejs = require("ejs");
var mq_client = require('../rpc/client');


exports.register = function(req,res){
	
	var email = req.param("email");
	var password = req.param("password");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var gender = req.param("gender");
	var dateofbirth = req.param("year") + "-" + req.param("month") + "-" + req.param("day");
	var groupid = req.param("groupid");
	var emailcheck = /\S+@\S+\.\S+/;
	
	//var getUser = "INSERT INTO userinfo (email, firstname, lastname, password, gender, dateofbirth) VALUES ('" + email + "','" + firstname + "','" + lastname + "','" + password + "','" + gender + "','" + dateofbirth + "')";									
	
	
	if(email == null || password == null || firstname == null || lastname == null || gender == null){
		
		//console.log(email + password + firstname + lastname + gender);
		res.end("empty");
		return;
	}
	else if(!emailcheck.test(email)){
		
		res.end("email invalid");
		return;
	}
	else{
		
		var msg_payload = {"email": email, "password": password, "firstname": firstname, "lastname": lastname, "gender": gender, "dateofbirth":dateofbirth};
		
		//console.log("In POST Request = email:"+ email+" "+password);
		
		mq_client.make_request('signup_queue',msg_payload, function(err,results){
		
			//console.log(results);
			if(err){
				throw err;
			}
			else 
			{
				if(results.code == 200){
					
					//console.log("valid SIGNUP");
					req.session.email = email;
					req.session.fullname = firstname + " " + lastname;
					res.end("registered");
				}
				else {    
					
					//console.log("Invalid Login");
					res.end("already");
				}
			}  
		});		
	}
};