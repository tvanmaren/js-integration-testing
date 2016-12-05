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
Your package.json should include the following modifications:
```
"scripts": {
  "knex": "knex",
  "test": "./node_modules/.bin/mocha -w"
}
```

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

Create your `puppies_dev` & `puppies_test` databases.

Create a migration file that creates the `puppies` table:

```
id serial
name string
age_in_months integer
breed string
image_url text
```

Create a seed file that inserts two rows into the `puppies` table.

##Write the Tests

Utilize the example code below (based on the resource `directors` for a movie app) in order to write integration tests for the following routes:

```
GET /puppies
GET /puppies/:id
POST /puppies
PUT /puppies/:id
DELETE /puppies/:id
```

As you follow this example in writing your own integration tests for `routes/puppies.js`, strive to understand the purpose and impact of each line.

Remember that it's the errors that pop up that we learn from. Strive to fix these yourself, but don't struggle for more than 20 minutes before asking your classmates or the instructors for help!


From `test/directorsSpec.js`:
```
process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../knex');

beforeEach((done) => {
  knex.migrate.latest().then(() => {
    knex.seed.run().then(() =>{
      knex('directors').then(directors => {
        allDirectors = directors;
        done();
      });
    });
  });
});

afterEach((done) => {
  knex.migrate.rollback()
  .then(() => {
    done();
  });
});

describe('GET /directors', () => {
  it('gets all directors', done => {
    request(app)
    .get('/directors')
    .expect('Content-Type', /json/)
    .end((err,res) => {
      expect(res.body.length).to.equal(allDirectors.length)
      done();
    })
  });
});

describe('GET /directors/:id', () => {
  it('gets a single director', done => {
    request(app)
    .get('/directors/1')
    .expect('Content-Type', /json/)
    .end((err,res) => {
      expect(res.body.id).to.equal(1)
      expect(res.body.name).to.equal('first')
      expect(res.body.age).to.equal(22)
      done();
    })
  });
});

describe('POST /directors', () => {
  const newDirector = {
    director: {
      id: 4,
      name: 'Veronica',
      age: 44
    }
  };
  const incorrectDataTypes = {
    director: {
      id: 6,
      name: 12,
      age: 'foo'
    }
  };
  it('successfully creates a director', done => {
    request(app)
    .post('/directors')
    .type('form')
    .send(newDirector)
    .end((err,res)=> {
      knex('directors').then(directors => {
        expect(directors).to.have.lengthOf(allDirectors.length+1);
        expect(directors).to.deep.include(newDirector.director);
        done();
      });
    });
  })
  it('returns a 400 if the data types added are incorrect', done => {
   request(app)
   .put('/directors/3')
   .type('form')
   .send(incorrectDataTypes)
   .end((err,res) =>{
    expect(res.status).to.equal(400)
    done();
  })
 })
});

describe('PUT /directors/:id', () => {
  const updatedDirector = {
    director: {
      id: 3,
      name: 'New Veronica',
      age: 54
    }
  };
  const incorrectDataTypes = {
    director: {
      id: 3,
      name: 12,
      age: 'foo'
    }
  };
  it('updates a director successfuly', done => {
   request(app)
   .put('/directors/3')
   .type('form')
   .send(updatedDirector)
   .end((err,res) =>{
    expect(res.body[0].id).to.equal(3)
    expect(res.body[0].name).to.equal('New Veronica')
    expect(res.body[0].age).to.equal(54)
    done();
  })
 })
  it('returns a 400 if the data types added are incorrect', done => {
   request(app)
   .put('/directors/3')
   .type('form')
   .send(incorrectDataTypes)
   .end((err,res) =>{
    expect(res.status).to.equal(400)
    done();
  })
 })
  it('returns a 404 if the id can not be found', done => {
   request(app)
   .put('/directors/10')
   .type('form')
   .send(updatedDirector)
   .end((err,res) =>{
    expect(err.statusCode).to.equal(404)
    done();
  })
 })
});

describe('DELETE /directors/:id', () => {
  it('deletes a director and its corresponding movies', done => {
   request(app)
   .delete('/directors/3')
   .end((err,res)=> {
    knex('directors').then(directors => {
      expect(directors).to.have.lengthOf(allDirectors.length-1);
      expect(res.body[0].id).to.equal(3);
    }).then(() => {
      knex('movies').where('director_id', res.body[0].id).then(movies => {
        expect(movies).to.have.lengthOf(0);
        done();
      });
    })
  });
 })
  it('returns a 404 if the id can not be found', done => {
   request(app)
   .delete('/directors/10')
   .end((err,res) =>{
    expect(err.statusCode).to.equal(404)
    done();
  })
 })
});
```
