'use strict';
process.env.NODE_ENV = 'test'

const request=require('supertest');
const expect=require('chai').expect;
const app=require('../app');
const knex=require('../knex');

var allDirectors=null;

beforeEach((done) => {
  knex.migrate.latest().then(() =>{
    knex.seed.run().then(() => {
      knex('directors').then((directors) => {
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

// GET /puppies
// GET /puppies/:id
// POST /puppies
// PUT /puppies/:id
// DELETE /puppies/:id
