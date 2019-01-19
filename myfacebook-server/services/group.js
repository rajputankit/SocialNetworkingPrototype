var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";
var ObjectID = require('mongodb').ObjectID;


function handle_request(msg, callback){
	
	if(msg.type == "creategroup"){
		
		creategroup(msg,callback);
		return;
	}
	else if(msg.type == "sendfriendrequest"){
		
		sendfriendrequest(msg,callback);
		return;
	}
	else if(msg.type == "groupdetails"){
		
		groupdetails(msg,callback);
		return;
	}
	else if(msg.type == "searchmembers"){
		
		searchmembers(msg,callback);
		return;
	}
	else if(msg.type == "addmember"){
		
		addmember(msg,callback);
		return;
	}
	else if(msg.type == "deletemember"){
		
		deletemember(msg,callback);
		return;
	}
	else if(msg.type == "deletegroup"){
		
		deletegroup(msg,callback);
		return;
	}
	else if(msg.type == "getusergroups"){
		
		getusergroups(msg,callback);
		return;
	}
	
}



function creategroup(msg, callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);

		var coll = mongo.collection('group');
		

		coll.insert({groupname: msg.groupname, members: [msg.memberemail]}, function(err, user){
			
			if (user) {

				res = JSON.stringify(user["ops"][0]["_id"]);
			} 
			else {

				res = "empty";
			}
			callback(null, res);
		});		
	});	
}



function groupdetails(msg, callback){
	
	var res = [];
	var res1 = [];
	var groupmembers = [];
	mongo.connect(mongoURL, function(){
		//console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('group');
		var coll1 = mongo.collection('userinfo');
		
		//console.log("AT SERVER CURRENTGROUPID: " + msg.currentgroupid);
		//console.log("AT SERVER CURRENTGROUPID: " + typeof msg.currentgroupid);
		coll.findOne({_id: new ObjectID(msg.currentgroupid)}, function(err, user){
			
			//console.log("at server current group details :" + JSON.stringify(user));
			if (user) {

				//res[0] = JSON.stringify(user);		
				res[0] = user;
				groupmembers = res[0].members;
				
				//console.log("RES MEMBERS[0] " + res[0]);
				//console.log("RES MEMBERS[0].members " + res[0].members);
				//console.log("RES MEMBERS " + groupmembers);
				
				coll1.find({_id:{$in: groupmembers}}, {firstname:true, lastname:true}).toArray(function(err, user1){
					
				//	console.log("IN COLL1")
				//	console.log("USER1 : " + JSON.stringify(user1));
					if (user1) {

						res[1] = user1;	
						//console.log("GROUP DETAILS GROUP MEMBERS NAME" + res[1]);
					} 
					else {

						res[1] = "empty";
					}
					callback(null, JSON.stringify(res));
				});		
				
				
				
				
			} 
			else {

				res = "empty";
			}
			//callback(null, res);
		});		
	});	
}



function searchmembers(msg,callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);

	var coll = mongo.collection('userinfo');
	//console.log("SEARCHMEMBER is " + msg.membername);
		coll.find({firstname: new RegExp(msg.membername, 'i')},{firstname: true, lastname: true}).toArray(function(err, user){
			
			//console.log("IN SERVER SEARCHMEMBERS : " + JSON.stringify(user));			
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


function addmember(msg,callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);

	var coll = mongo.collection('group');

	
	coll.update({_id: new ObjectID(msg.currentgroupid)},{$push : {members: msg.memberemail}}, function(err, user){
			
			//console.log("IN SERVER ADDMEMBERS : " + JSON.stringify(user));			
			if (user) {

				res = JSON.stringify(user);	
			//	console.log("in ADD member + " + res);
				//res = JSON.stringify(user["ops"][0]["_id"]);
			} 
			else {

				res = "empty";
			}
			callback(null, res);
		});		
	});	
}



function deletemember(msg,callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);

	var coll = mongo.collection('group');
	
	coll.update({_id: new ObjectID(msg.currentgroupid)},{$pull:{members: msg.memberemail}}, function(err, user){
			
			//console.log("IN SERVER DELETEMEMBERS : " + JSON.stringify(user));			
			if (user) {

				res = JSON.stringify(user);	
				//console.log("in DELETE member + " + res);
				//res = JSON.stringify(user["ops"][0]["_id"]);
			} 
			else {

				res = "empty";
			}
			callback(null, res);
		});		
	});	
}



function deletegroup(msg,callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' + mongoURL);

	var coll = mongo.collection('group');
	
	coll.remove({_id: new ObjectID(msg.groupid)}, function(err, user){
			
			//console.log("IN SERVER DELETEGROUP : " + JSON.stringify(user));			
			if (user) {

				res = JSON.stringify(user);	
				//console.log("in DELETE GROUP + " + res);
				//res = JSON.stringify(user["ops"][0]["_id"]);
			} 
			else {

				res = "empty";
			}
			callback(null, res);
		});		
	});	
}



function getusergroups(msg,callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
		
	//console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('group');
	//console.log("GETUSERGROUPS is " + msg.memberemail);
	
	coll.find({members: {$in: [msg.memberemail]}},{groupname: true}).toArray(function(err, user){
			
			//console.log("IN SERVER GETUSERGROUPS : " + JSON.stringify(user));			
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




exports.handle_request = handle_request;







