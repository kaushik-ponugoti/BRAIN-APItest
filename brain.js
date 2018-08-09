var express    = require('express');
var bodyParser = require('body-parser');
var fs         = require('fs');
var isSubset   = require('is-subset');
var path       = require('path');
var parse      = require('csv-parse');
var app        = express();

//file structure
// const GROUPS   = path.join(__dirname, './C:/Windows/System32/drivers/etc/group');
const GROUPS   = path.join(__dirname, './group');
const USERS    = path.join(__dirname, './passwd');

var obj_user  = [];
var obj_group = [];

// read the User related File to JSON
var parser = parse({delimiter: ':'}, function (err, data) {
    data.forEach(function(line) {
        
        var obj_ = { "name"     : line[0],
                    "password" : line[1],
                    "uid"      : line[2],
                    "gid"      : line[3],
                    "comment"  : line[4],
                    "home"     : line[5],
                    "shell"    : line[6]
                   };
        obj_user.push(obj_);
    });    
});
    
// read the inputFile, feed the contents to the parser
fs.createReadStream(USERS).pipe(parser);

// read the Group related file to JSON
var parser = parse({delimiter: ':'}, function (err, data) {
    data.forEach(function(line) {
        
      var obj_ = { "name"        : line[0],
                   "password" : line[1],
                   "gid"      : line[2],
                   "members"  : line[3] 
                 };
        obj_group.push(obj_);
    });    
});
 
// read the inputFile, feed the contents to the parser
fs.createReadStream(GROUPS).pipe(parser);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen(process.env.PORT || 8000);
console.log('api server running at port 8000');

// GET /groups/query
/**
	*@api {get} http://localhost:8000/groups/query? Search groups with complex queries
	*@apiName Groups complex search
	*@apiGroup Groups
	*@apiParam [name]    
	*@apiParam [gid]   
	*@apiExample {curl} Example usage:
	*     http://localhost:8000/groups/query?gid=1002&name=docker
	*@apiSuccessExample {JSON} Success-Response-Example:
	*{
        "name": "docker",
        "gid": 1002,
        "members": [
            "brian",
            "kay",
            "tom"
        ]
    }
	*/
app.get('/groups/query', function(req,res){
    var query_object = {};

    console.log("Query Parameters :" + JSON.stringify(req.query));

    // push all the query parameters to a JSON object
    for(let q_obj in req.query){
        query_object[q_obj] = req.query[q_obj];
    }

    // If empty query, return all the data
    if(Object.keys(query_object).length == 0){
        res.send(obj_group);
        return;
    }
    
    //Checking if the query parameters match any of the data
    for(var i = 0; i < obj_group.length ; i++){
    if(isSubset(obj_group[i],query_object) == true){
        res.send(obj_group[i]);
        return;
    }
    }
    
    // If no matching data, return 404
    res.status(404);
    res.send('Not Found.');
});

// GET /users/query
/**
	*@api {get} http://localhost:8000/users/query? Search users with complex queries
	*@apiName Users complex search
	*@apiGroup Users
	*@apiParam [name]    
	*@apiParam [uid]   
	*@apiParam [gid]   
	*@apiParam [comment] 
	*@apiParam [home]    
	*@apiExample {curl} Example usage:
	*     http://localhost:8000/users/query?name=root&comment=root
	*@apiSuccessExample {JSON} Success-Response-Example:
	*[
        {
            "name": "root",
            "uid": 0,
            "gid": 0,
            "comment": "root",
            "home": "/root",
            "shell": "/bin/bash"
        }
    ]
	*/
app.get('/users/query', function(req,res){
    var query_object = {};

    console.log("Query Parameters :" + JSON.stringify(req.query));

    // push all the query parameters to a JSON object
    for(let q_obj in req.query){
        query_object[q_obj] = req.query[q_obj];
    }

    // If empty query, return all the data
    if(Object.keys(query_object).length == 0){
    res.send(obj_user);
    return;
    }
    
    //Checking if the query parameters match any of the data
    for(var i = 0; i < obj_user.length ; i++){
        if(isSubset(obj_user[i],query_object) == true){
            res.send(obj_user[i]);
            return;
        }
    }

    // If no matching data, return 404
    res.status(404);
    res.send('Not Found.');
});


// GET /users
/**
	*@api {get} http://localhost:8000/users/ List of all the users
	*@apiName Complete Users list
	*@apiGroup Users   
	*@apiExample {curl} Example usage:
	*     http://localhost:8000/users/
	*@apiSuccessExample {JSON} Success-Response-Example:
	*[
        {
            "name": "root",
            "uid": 0,
            "gid": 0,
            "comment": "root",
            "home": "/root",
            "shell": "/bin/bash"
        },
        {
            "name": "dwoodlins",
            "uid": 1001,
            "gid": 1001,
            "comment": "",
            "home": "/home",
            "shell": "/bin"
        },
        {
            "name": "tom",
            "uid": 1002,
            "gid": 1002,
            "comment": "",
            "home": "/home",
            "shell": "/bin"
        },
        {
            "name": "brian",
            "uid": 1003,
            "gid": 1003,
            "comment": "",
            "home": "/home",
            "shell": "/bin"
        },
        {
            "name": "kay",
            "uid": 1004,
            "gid": 1004,
            "comment": "",
            "home": "/home",
            "shell": "/bin"
        }
    ]
	*/
app.get('/users', function(req,res){
    res.send(obj_user);
});

// GET /groups
/**
	*@api {get} http://localhost:8000/groups/ List of all the groups
	*@apiName Complete groups list
    *@apiGroup Groups    
	*@apiExample {curl} Example usage:
	*     http://localhost:8000/groups/
	*@apiSuccessExample {JSON} Success-Response-Example:
	*[
        {
            "name": "_analyticsusers",
            "gid": 250,
            "members": [
                "dwoodlins",
                "tom"
            ]
        },
        {
            "name": "docker",
            "gid": 1002,
            "members": [
                "brian",
                "kay",
                "tom"
            ]
        },
        {
            "name": "node",
            "gid": 1003,
            "members": [
                "brian"
            ]
        },
        {
            "name": "test",
            "gid": 1004,
            "members": []
        }
    ]
	*/
app.get('/groups', function(req,res){
    res.send(obj_group);
});

// GET /users/uid
/**
	*@api {get} http://localhost:8000/users/:id User search with id
	*@apiName User search with id
	*@apiGroup Users   
    *@apiParam uid  
	*@apiExample {curl} Example usage:
	*     http://localhost:8000/users/1001
	*@apiSuccessExample {JSON} Success-Response-Example:
	*{
        "name": "dwoodlins",
        "uid": 1001,
        "gid": 1001,
        "comment": "",
        "home": "/home",
        "shell": "/bin"
    }
	*/
app.get('/users/:id', function(req,res){
    for(var i = 0; i < obj_user.length; i++){
        if((obj_user[i].uid) == req.params.id){
            res.send(obj_user[i]);
            return;
        }
    }

    // If no matching data, return 404
    res.status(404);
    res.send('Not Found.');
});

// GET /users/uid/groups
/**
	*@api {get} http://localhost:8000/users/:id/groups Group search with User id
	*@apiName Group search with User id
	*@apiGroup Users   
    *@apiParam uid    
	*@apiExample {curl} Example usage:
	*     http://localhost:8000/users/1001/groups
	*@apiSuccessExample {JSON} Success-Response-Example:
	*[
        {
            "name": "_analyticsusers",
            "gid": 250,
            "members": [
                "dwoodlins",
                "tom"
            ]
        }
    ]
	*/
app.get('/users/:id/groups', function(req,res){

    var obj_gid;
    var gid_arr = [];
    
    for(var i = 0; i < obj_user.length; i++){
        if((obj_user[i].uid) == req.params.id){
            obj_gid = (obj_user[i].gid);
        }
    }

    for(var i = 0; i < obj_group.length; i++){
        if((obj_group[i].gid) == obj_gid){
            gid_arr.push(obj_group[i]);
        }
    }
    
    // If no matching data, return 404
    if(gid_arr.length == 0){
        res.status(404);
        res.send('Not Found.');
    }
    else{
        res.send(gid_arr);
    }

});

// GET /groups/gid
/**
	*@api {get} http://localhost:8000/groups/:id Group search with id
	*@apiName Group search with id
	*@apiGroup Groups    
    *@apiParam gid   
	*@apiExample {curl} Example usage:
	*     http://localhost:8000/groups/250
	*@apiSuccessExample {JSON} Success-Response-Example:
	*{
        "name": "_analyticsusers",
        "gid": 250,
        "members": [
            "dwoodlins",
            "tom"
        ]
    }
	*/
app.get('/groups/:id', function(req,res){
    for(var i = 0; i < obj_group.length; i++){
        if((obj_group[i].gid) == req.params.id){
            res.send(obj_group[i]);
            return;
        }
    }

    // If no matching data, return 404
    res.status(404);
    res.send('Not Found.');
});


