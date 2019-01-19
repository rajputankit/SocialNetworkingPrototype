var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.index = function(req, res){
	
	if(req.session.email){
		
		res.render("group");		
	}
	else{
		
		res.render("group");
	}	
};



exports.creategroup = function(req,res){
	
	
	var msg_payload = {"groupname": req.param("groupname"), "memberemail": req.session.email, "type": 'creategroup'};
	
	mq_client.make_request('group_queue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else{
			
			if(results.code == 200){
				
				req.session.currentgroupid = results;
				res.end();
			}
			else{    
				
				req.session.currentgroupid = results;
				res.end();
			}
		}  
	});		
};


exports.groupdetails = function(req,res){
	
	
	var msg_payload = {"currentgroupid": req.session.currentgroupid, "type": 'groupdetails'};
	
	mq_client.make_request('group_queue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else{
			
			//console.log("at CLIENT current group details :" + JSON.stringify(results));			
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{    
				
				res.end("null");
			}
		}  
	});		
};


exports.searchmembers = function(req,res){
	
	
	var msg_payload = {"membername": req.param("membername"), "type": "searchmembers"};
	
	mq_client.make_request('group_queue',msg_payload, function(err,results){
		
		//console.log("in SEARCHMEMBERS : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			//console.log("IN GROUP.JS SEARCHMEMBERS ELSE BLOCK : " + JSON.stringify(results));
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{
				
				res.end("null");
			}
		}   
	});		
};


exports.addmember = function(req,res){
	
	
	var msg_payload = {"memberemail": req.param("memberemail"), "currentgroupid": req.session.currentgroupid, "type": "addmember"};
	
	mq_client.make_request('group_queue',msg_payload, function(err,results){
		
		//console.log("in ADDMEMBER : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			//console.log("IN GROUP.JS ADDMEMBERS ELSE BLOCK : " + JSON.stringify(results));
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{
				
				res.end("null");
			}
		}   
	});		
};


exports.deletemember = function(req,res){
	
	
	var msg_payload = {"memberemail": req.param("memberemail"), "currentgroupid": req.session.currentgroupid, "type": "deletemember"};
	
	mq_client.make_request('group_queue',msg_payload, function(err,results){
		
		//console.log("in DELETEMEMBER : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			//console.log("IN GROUP.JS DELETEMEMBERS ELSE BLOCK : " + JSON.stringify(results));
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{
				
				res.end("null");
			}
		}   
	});		
};



exports.deletegroup = function(req,res){
	
	
	var msg_payload = {"groupid": req.param("groupid"), "type": "deletegroup"};
	
	mq_client.make_request('group_queue',msg_payload, function(err,results){
		
		//console.log("in DELETEGROUP : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			//console.log("IN GROUP.JS DELETEGROUP ELSE BLOCK : " + JSON.stringify(results));
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{
				
				res.end("null");
			}
		}   
	});		
};



exports.getusergroups = function(req,res){
	
	
	var msg_payload = {"memberemail": req.session.email, "type": "getusergroups"};
	
	mq_client.make_request('group_queue',msg_payload, function(err,results){
		
		//console.log("in getusergroups : " + JSON.stringify(results));
		if(err){
		
			throw err;
		}
		else{
			
			//console.log("IN GROUP.JS GETUSERGROUPS ELSE BLOCK : " + JSON.stringify(results));
			if(results){
				
				res.end(JSON.stringify(results));
			}
			else{
				
				res.end("null");
			}
		}   
	});		
};







