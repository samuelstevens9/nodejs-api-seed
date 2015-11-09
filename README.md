# README #

My seed projet for Node.JS API server

### Requires ###

 * Node.js
 * npm
 * mongodb

### Usefull ###

 * robomongo : to view mongodb 

### After cloning, run this to setup dependencies ###

    $ npm install

### To initialize data ###

    $ node init_data.js

Then hit CTRL+C to exit when it is finished. If you want to reset the data, you will need to manually DROP meptech from mongodb.

### To start server ###

First make sure mongoDB is running

    $ mongod

Then to run the API locally

    $ node server.js

### Usage ###

http://localhost:3000/api/users

http://localhost:3000/api/users/:_id

### API ###

* /authenticate
* /users
* /users/:_id


(*may not be implemented)