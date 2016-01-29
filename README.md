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
  

If you want to reset the data, you will need to manually DROP DB from mongodb.

### To start server ###


Make sure mongod is running. Now open a new command prompt to run the API locally.

    $ npm start


### Usage ###

http://localhost:5001/api/users

http://localhost:5001/api/users/:_id

### API ###

* /authenticate
* /users
* /users/:_id
