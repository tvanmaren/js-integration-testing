#Javascript Integration Testing

##Directory Setup

Follow the setup instructions. Make sure that you know why each of these steps is necessary, and what their output/outcome is.
```
$ mkdir js-integration-testing
$ cd js-integration-testing
$ git init
$ npm init -y
$ echo 'node_modules'>>.gitignore
$ npm install --save-dev chai mocha supertest
$ npm install --save express morgan knex pg body-parser cookie-parser dotenv
$ touch app.js
$ touch knexfile.js
$ touch knex.js
```
Add `"knex": "knex"` to package.json `"scripts"` object

Set `"scripts"` --> `"test"` value in package.json to `"./node_modules/.bin/mocha -w"`


In the `knexfile.js` file, type and save the following code.
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
In the `knex.js` file, type and save the following code:
```
const env = process.env.NODE_ENV || 'development';
const config = require('knexfile')[env];
module.exports = require('knex')(config);
```

Create the test directory and test file:
```
$ mkdir test
$ cd test
$ touch puppiesSpec.js
```
Using Galvanize Bookshelf as a reference, write the necessary code in `app.js` to get your server running.

Create your routes directory and touch into it `puppies.js`.
Write code in `puppies.js` so that when you send a request to `http://localhost:8000/puppies`, the message 'Hello, puppies!' is sent in response. 

Create your `puppies` database.
Create a migration file that creates the `puppies` table:

```
**id** serial
**name** string
**age** integer
**breed** string
**image_url** text
```

Create a seed file that inserts at least three rows into the `puppies` table.
