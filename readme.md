#Javascript Integration Testing

##Directory Setup

Build out a directory that is set up for testing:
```
$ mkdir js-integration-testing
$ cd js-integration-testing
$ git init
$ npm init -y
$ echo 'node_modules'>>.gitignore
$ npm install --save-dev chai mocha supertest
$ npm install --save express morgan knex pg body-parser cookie-parser
$ touch app.js
$ touch knexfile.js

set "scripts" --> "test" value in package.json to "./node_modules/.bin/mocha -w"
```
In the knexfile.js file, write and save the following code.
```
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/movie_junkies_dev'
  }
};
```
Create the test directory and test file:
```
$ mkdir test
$ cd test
$ touch puppiesSpec.js
```
