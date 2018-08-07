## BRAIN-APItest
AIM : To develop search API service for user and groups data from local files.

1. Language : Node.js 
2. Type     : REST API http protocol
3. Test tool : POSTMAN

## The APIs Covered :
1. [GET] : "/users" : Display the list of all users.
2. [GET] : "/users/:id" : Search a user with a specified "uid";
3. [GET] : "/users/:id/groups" : Search the list of all groups that particular user is associated with.
4. [GET] : "/groups" : Display the list of all groups.
5. [GET] : "/groups/:id" : Search a particular group with a specified "gid".
6. [GET] : "/groups/query?" : Complex search query for a group with parameters.
7. [GET] : "/users/query?" : Complex search query for a user with parameters.

>> Success Status Code : 200
>> Error Status Code : 404

## API Documentation:
1. The plugin used to document this API is "apidoc".
2. "npm install apidoc -g" is the command to install it.
3. After running the node server, in the file explorer, open "./doc/index.html" to go through the document.

## Installations Required : 
1. Node.js and npm. (Ref : https://nodejs.org/en/download/)
2. POSTMAN testing tool. (optional) (Ref : https://www.getpostman.com/apps)
3. Microsoft Visual Studio Code editor. (optional) (Ref : https://code.visualstudio.com/download)

## Instructions to run :
1. Download and install the latest version of node.js and npm.
2. Clone or download this repository zip file.
3. Extract this repository in a directory where node.js is installed.
4. In the main directory, run the following command : "node brain.js" from the command line.
5. The APIs could then be tested in the browser or in the POSTMAN tool or in any api test tool.

Note : All of the above instructions are related to Windows OS.

## Security:
1. The service could be installed with an SSL certificate to implement HTTPS protocol.
2. The headers of the service could consist of meta data such as a unique ID and a TOKEN for additional layer security.
3. Session controlling from node.js could also add up to the security.
