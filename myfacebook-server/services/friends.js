var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";


function handle_request(msg, callback){
	
	if(msg.type == "searchpeople"){
		
		searchpeople(msg,callback);
		return;
	}
	else if(msg.type == "sendfriendrequest"){
		
		sendfriendrequest(msg,callback);
		return;
	}
	else if(msg.type == "getfriendrequests"){
		
		getfriendrequests(msg,callback);
		return;
	}
	else if(msg.type == "confirmfriendrequest"){
		
		confirmfriendrequest(msg,callback);
		return;
	}
	else if(msg.type == "getfriends"){
		
		getfriends(msg,callback);
		return;
	}
	else if(msg.type == "notificationcount"){
		
		notificationcount(msg,callback);
		return;
	}
	else if(msg.type == "poststatus"){
		
		poststatus(msg,callback);
		return;
	}
	else if(msg.type == "getstatus"){
		
		getstatus(msg,callback);
		return;
	}
}


function searchpeople(msg,callback){
	
	var res = {};
//console.log("IN INSERTWORK FUNCTION");

	var json_responses;
	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);

//		var coll = mongo.collection('userinfo');
//		console.log("searchtext is " + msg.searchtext);
//		coll.findOne({firstname: new RegExp(msg.searchtext)},{firstname: true, lastname: true}, function(err, user){
//			console.log("IN SERVER friends : " + JSON.stringify(user));
//			if (user) {
//
//				res = JSON.stringify(user);								
//			} 
//			else {
//
//				res = "empty";
//			}
//			callback(null, res);
//		});
		
		var coll = mongo.collection('userinfo');
		//console.log("searchtext is " + msg.searchtext);
		coll.find({firstname: new RegExp(msg.searchtext, 'i')},{firstname: true, lastname: true}).toArray(function(err, user){
			//console.log("IN SERVER friends : " + JSON.stringify(user));
			if (user) {

				res = JSON.stringify(user);								
			} 
			else {

				res = "empty";
			}
			callback(null, res);
		});		
	});	
}


function sendfriendrequest(msg,callback){
	
	var res = {};
//console.log("IN INSERTWORK FUNCTION");

	var json_responses;
	mongo.connect(mongoURL, function(){
		//console.log('Connected to mongo at: ' + mongoURL);

		var coll = mongo.collection('tempfriends');
		
		coll.insert({sourceemail: msg.sourceemail , destinationemail: msg.destinationemail}, function(err, user){
			
			if (user) {

				res.code = "200";								
			} 
			else {

				res.code = "401";
			}
			callback(null, res);
		});		
	});	
}



function confirmfriendrequest(msg,callback){
	
	var res = {};
	var res1 = {};
	var json_responses;
	//console.log("IN SERVER CONFIRM REQUEST");
	mongo.connect(mongoURL, function(){
		
		//console.log('Connected to mongo at: ' + mongoURL);

		var coll = mongo.collection('friends');
		var coll1 = mongo.collection('tempfriends');

		coll.insert([{email: msg.email, friendemail: msg.friendemail},{email: msg.friendemail, friendemail: msg.email}], function(err, user){
			
			if (user){
					
				//console.log("IN IF");
				res = user;				
				coll1.remove({sourceemail: msg.friendemail , destinationemail: msg.email}, function(err, user1){
					
					//console.log("IN COLLONE friends name : " + JSON.stringify(user1));
					if (user1) {
						//console.log("IN IF IF");
						res1 = JSON.stringify(user1);
						//console.log(res1);
					} 
					else {
						//console.log("IN IF ELSE");
						res1 = "empty";
					}
					callback(null, res1);
				});	
			} 
			else{
				//console.log("IN ELSE");
				res.code = "401";
			}
			callback(null, res);
		});		
	});	
}


function getfriendrequests(msg,callback){
	
	var res = [];
	var res1 = [];
	var emails = [];
	mongo.connect(mongoURL, function(){
		
		//console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('tempfriends');
		var coll1 = mongo.collection('userinfo');
		coll.find({destinationemail: msg.email}, {_id:false, sourceemail:true}).toArray(function(err, user){
			
			if (user) {
				
				res = user;
				for (var i = 0; i < res.length; i++) {
					emails.push(res[i].sourceemail);
				}
				
				//console.log("list of emails in getrequests" + emails);
				if(emails.length > 0){
					
					//console.log("in IF");
					coll1.find({_id:{$in: emails}}, {firstname:true, lastname:true}).toArray(function(err, user1){

						//console.log("IN COLLONE friends name : " + JSON.stringify(user1));
						if (user1) {

							res1 = JSON.stringify(user1);								
						} 
						else {

							res1 = "null";
						}
						callback(null, res1);
					});
				}
				else{
					
					//console.log("in else of getrequests");
					res1 = "null";			
					//console.log("in else of getrequests" + res1);
					callback(null, res1);
				}
			} 
			else {

				res = "empty";
			}
			//callback(null, res);
		});		
		
	});	
}


function getfriends(msg,callback){
	
	var res = {};
	var res1 = {};
	var emails = [];
	var json_responses;
	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);
	
	var coll = mongo.collection('friends');
	var coll1 = mongo.collection('userinfo');
	
		coll.find({email: msg.email}).toArray(function(err, user){			
			
			//console.log("MY Friends emails : " + JSON.stringify(user));
			if (user) {

				res = user;				
				//console.log("res is " + res);
								 
				for (var i = 0; i < res.length; i++) {
					emails.push(res[i].friendemail);
				}
				
				//console.log("list of emails" + emails);
				
				if(emails.length > 0){
					
					coll1.find({_id:{$in: emails}}, {firstname:true, lastname:true}).toArray(function(err, user1){

						if (user1) {

							res1 = JSON.stringify(user1);	
							//console.log("res1 is : " + res1);
						} 
						else {

							res1 = "empty";
						}
						callback(null, res1);
					});		
				}
				else{

					//console.log("in else of getfriends");
					res1 = "null";			
					//console.log("in else of getfriends" + res1);
					callback(null, res1);					
				}
			} 
			else {

				res = "empty";
			}
			//callback(null, res);
		});	
		
	});	
}



function notificationcount(msg,callback){
	
	var res = {};

	var json_responses;
	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);

		var coll = mongo.collection('tempfriends');
		
		coll.find({destinationemail: msg.email}).toArray(function(err, user){
			//console.log("IN SERVER friends : " + JSON.stringify(user));
			
			if (user) {

				res = user;
				//console.log("Total notifications : " + res.length);
			} 
			else {

				res = "empty";
			}
			callback(null, res.length);
		});		
	});	
}



function poststatus(msg,callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);

		var coll = mongo.collection('userstatus');
		
//		db.products.update(
//				  { _id: 1 },
//				  {
//				     $set: { item: "apple" },
//				     $setOnInsert: { defaultQty: 100 }
//				  },
//				  { upsert: true }
//		)
		
		
//		coll.update({_id: new ObjectID(msg.currentgroupid)},{$push : {members: msg.memberemail}}, function(err, user){


//		db.test.update(
//				   { _id: 1 },
//				   { $addToSet: {letters: [ "c", "d" ] } }
//		)
		
		
		//coll.update({_id: msg.email}, {$addToSet: {status: [msg.status]}, $setOnInsert: {status: msg.status}} ,{upsert: true}, function(err, user){
		coll.update({_id: msg.email, fullname: msg.fullname}, {$push: {status: msg.status}} ,{upsert: true}, function(err, user){
			//console.log("IN SERVER POSTSTATUS : " + JSON.stringify(user));
			
			if (user) {

				res = JSON.stringify(user);				
			} 
			else {

				res = "empty";
			}
			callback(null, res.length);
		});		
	});	
}



function getstatus(msg,callback){
	
	var res = {};
	var res1 = {};
	var emails = [];
	var json_responses;
	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);
	
	var coll = mongo.collection('friends');
	var coll1 = mongo.collection('userstatus');
	
		coll.find({email: msg.email}).toArray(function(err, user){			
			
			//console.log("GET STATUS MY Friends emails : " + JSON.stringify(user));
			if (user) {

				res = user;				
				//console.log("res is " + res);
								 
				for (var i = 0; i < res.length; i++) {
					emails.push(res[i].friendemail);
				}
				
				//console.log("STATUS list of friends emails" + emails);
				
				if(emails.length > 0){
					
					coll1.find({_id:{$in: emails}}).toArray(function(err, user1){
						//console.log("GET STATUS USER1 is : " + user1);
						if (user1) {

							res1 = JSON.stringify(user1);	
							//console.log("GET STATUS RES1 is : " + res1);
						} 
						else {

							res1 = "empty";
						}
						callback(null, res1);
					});		
				}
				else{

					//console.log("in else of getfriends");
					res1 = "null";			
					//console.log("in else of getfriends" + res1);
					callback(null, res1);					
				}
			} 
			else {

				res = "empty";
			}
			//callback(null, res);
		});	
		
	});	
}






exports.handle_request = handle_request;







