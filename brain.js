var express    = require('express');
var bodyParser = require('body-parser');
var fs         = require('fs');
var isSubset   = require('is-subset');
var app        = express();

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
    var obj, query_;
    var query_object = {};

    console.log("Query Parameters :" + JSON.stringify(req.query));

    // push all the query parameters to a JSON object
    for(let q_obj in req.query){
        query_object[q_obj] = req.query[q_obj];
    }

    if(query_object.hasOwnProperty('gid')){
        query_object['gid'] = parseInt(query_object['gid']); 
    }

    // read the file related to the API
    fs.readFile('./etc/groups.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      
      // If empty query, return all the data
      if(Object.keys(query_object).length == 0){
          res.send(obj);
          return;
      }
      
      //Checking if the query parameters match any of the data
      for(var i = 0; i < obj.length ; i++){
        if(isSubset(obj[i],query_object) == true){
            res.send(obj[i]);
            return;
        }
      }
      
      // If no matching data, return 404
      res.status(404);
      res.send('Not Found.');
    });
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
    var obj;
    var query_object = {};

    console.log("Query Parameters :" + JSON.stringify(req.query));

    // push all the query parameters to a JSON object
    for(let q_obj in req.query){
        query_object[q_obj] = req.query[q_obj];
    }

    if(query_object.hasOwnProperty('uid')){
        query_object['uid'] = parseInt(query_object['uid']); 
    }
    if(query_object.hasOwnProperty('gid')){
        query_object['gid'] = parseInt(query_object['gid']); 
    }

    // read the file related to the API
    fs.readFile('./etc/passwd.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);

      // If empty query, return all the data
      if(Object.keys(query_object).length == 0){
        res.send(obj);
        return;
      }
      
      //Checking if the query parameters match any of the data
      for(var i = 0; i < obj.length ; i++){
          if(isSubset(obj[i],query_object) == true){
              res.send(obj[i]);
              return;
          }
      }

      // If no matching data, return 404
      res.status(404);
      res.send('Not Found.');
    });
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
    var obj;

    // read the file related to the API
    fs.readFile('./etc/passwd.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.send(obj);
    });
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
    var obj;

    // read the file related to the API
    fs.readFile('./etc/groups.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.send(obj);
    });
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
    var obj;

    // read the file related to the API
    fs.readFile('./etc/passwd.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);

        for(var i = 0; i < obj.length; i++){
            if(JSON.stringify(obj[i].uid) == req.params.id){
                res.send(obj[i]);
                return;
            }
        }

        // If no matching data, return 404
        res.status(404);
        res.send('Not Found.');
    });
    
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
    var obj_users;
    var obj_groups;
    var obj_name;
    var gid_arr = [];
    var final   = [];

    // read the file related to the API
    fs.readFile('./etc/passwd.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj_users = JSON.parse(data);
    
        for(var i = 0; i < obj_users.length; i++){
            if(JSON.stringify(obj_users[i].uid) == req.params.id){
                obj_name = JSON.stringify(obj_users[i].name);
            }
        }
        
        fs.readFile('./etc/groups.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj_groups = JSON.parse(data);

            for(var i = 0; i < obj_groups.length; i++){
                for(var j = 0; j < obj_groups[i].members.length; j ++){
                    if(JSON.stringify(obj_groups[i].members[j]) == obj_name){
                        gid_arr.push(obj_groups[i].gid);
                    }
                }
            }
            for(key in gid_arr){
                for(var k = 0; k < obj_groups.length; k++){
                    if(JSON.stringify(obj_groups[k].gid) == gid_arr[key]){
                       final.push(obj_groups[k]);
                       res.send(final);
                       return;
                    }
                }
            }  

            // If no matching data, return 404
            res.status(404);
            res.send('Not Found.');
        });
    });
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
    var obj;

    // read the file related to the API
    fs.readFile('./etc/groups.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      
      for(var i = 0; i < obj.length; i++){
        if(JSON.stringify(obj[i].gid) == req.params.id){
           res.send(obj[i]);
           return;
        }
      }

      // If no matching data, return 404
      res.status(404);
      res.send('Not Found.');
    });
});


