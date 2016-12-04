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
$ touch knex.js

add "knex": "knex" to package.json "scripts" object

set "scripts" --> "test" value in package.json to "./node_modules/.bin/mocha -w"

```
In the knexfile.js file, write and save the following code.
```
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/puppies_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/puppies_test'
  }
};
```
In the knex.js file, write and save the following code:
```
const env = process.env.NODE_ENV || 'development';
const config = require('knexfile')[env];
module.exports = require('knex')(config)
```

Create the test directory and test file:
```
$ mkdir test
$ cd test
$ touch puppiesSpec.js
```
