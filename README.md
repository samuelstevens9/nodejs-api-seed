# README #

My seed projet for Node.JS API server

### Requires ###

 * Node.js
 * npm
 * mongodb

### Useful ###

 * robomongo : to view mongodb 

### After cloning, run this to setup dependencies ###

    $ npm install

### To initialize data ###

First make sure mongoDB is running. Open a new command prompt and run:

    $ mongod

Now open a new command prompt and initialize the data.

    $ node init_data.js
    
    /api/authenticate/init_data_m3rv311

Then hit CTRL+C to exit when it is finished. If you want to reset the data, you will need to manually DROP DB from mongodb.
Default User: admin@phyteck.com, password; physician@phyteck.com, password

### To start server ###


Make sure mongod is running. Now open a new command prompt to run the API locally.

    $ node server.js


### Usage ###

http://localhost:3000/api/users

http://localhost:3000/api/users/:_id

### API ###

* /authenticate
* /users
* /users/:_id


(*may not be implemented)