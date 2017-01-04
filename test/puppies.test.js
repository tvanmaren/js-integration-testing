'use strict';
process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../knex');

var allPuppies = null;

beforeEach((done) => {
  knex.migrate.latest().then(() => {
    knex.seed.run().then(() => {
      knex('puppies').then((puppies) => {
        allPuppies = puppies;
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

// GET /puppies
describe('GET /puppies', () => {
  it('gets all puppies', (done) => {
    request(app)
      .get('/puppies')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.length).to.equal(allPuppies.length);
        done();
      });
  });
});

// GET /puppies/:id
describe('GET /puppies/:id', () => {
  it('gets a single puppy', (done) => {
    request(app)
      .get('/puppies/1')
      .expect('Content-type', '/json')
      .end((err, res) => {
        expect(res.body.id).to.equal(1);
        expect(res.body.name).to.equal('Smugglewumpus');
        expect(res.body.age_in_months).to.equal(3);
        done();
      });
  });
});

// POST /puppies
describe('POST /puppies', () => {
  const newPuppy = {
    puppy: {
      name: 'Wocket',
      breed: 'Pug',
      age_in_months: 4,
      image_url: 'http://6iee.com/data/uploads/37/382786.jpg'
    }
  };
  const incorrectDataTypes = {
    puppy: {
      id: 6,
      name: 8,
      age_in_months: 'whatever'
    }
  };

  it('successfully creates a puppy', (done) => {
    console.log(allPuppies);
    console.log(newPuppy);
    request(app)
      .post('/puppies')
      .send(newPuppy.puppy)
      .end((err, res) => {
        knex('puppies')
          .then((puppies) => {
            console.log('puppies:',puppies);
            // expect(res.body).to.include(newPuppy.puppy);
            expect(puppies).to.have.lengthOf(allPuppies);
            expect(puppies).to.deep.include(newPuppy.puppy);
            done();
          });
      });
  });

  it('returns a 400 if the data types added are incorrect', (done) => {
    request(app)
      .put('/puppies/3')
      .type('json')
      .send(incorrectDataTypes)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});

// PUT /puppies/:id

// describe('PUT /puppies/:id', () => {
//   const updatedPuppy = {
//
//   };
// });

// DELETE /puppies/:id
