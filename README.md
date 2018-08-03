## BRAIN-APItest
This project is to develop search APIs for a user and groups data from local files.

1. Language : Node.js 
2. Type     : REST API http protocol
3. Test tool : POSTMAN

Installations Required : Node.js and npm.
link : https://nodejs.org/en/download/

Instructions to run :
1. Download and install node.js and npm.
2. Clone or download this repository zip file.
3. Extract this repository in a directory where node.js is installed.
4. In the main directory, run the following command : "node brain.js";
5. The APIs could then be tested in the browser or in the POSTMAN tool.

### The APIs Covered :
1. [GET] : "/users" : Responses the list of all the users.
2. [GET] : "/users/:id" : Responses the user with the specified "id";
3. [GET] : "/users/:id/groups" : Responses the list of all the groups that particular user is associated with.
4. [GET] : "/groups" : Responses the list all the groups.
5. [GET] : "/groups/:id" : Responses the particular group with the specified "id".
6. [GET] : "/groups/query?" : Complex search query for a group with parameters.
7. [GET] : "/users/query?" : Complex search query for a user with parameters.

Status : Pending . . .


