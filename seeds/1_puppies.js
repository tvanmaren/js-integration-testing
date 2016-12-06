'use strict';
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('puppies').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('puppies').insert({
          id: 1,
          name: 'Smugglewumpus',
          age_in_months: 3,
          breed: 'Yorkshire Terrier',
          image_url: 'http://petguide.com.vsassets.com/wp-content/uploads/2013/02/yorkshire-terrier-21.jpg'
        }, {
          id: 2,
          name: 'Roscoe',
          age_in_months: 2,
          breed: 'Italian Greyhound',
          image_url: 'https://s-media-cache-ak0.pinimg.com/236x/05/24/47/052447cf59acebf6f82dcd8bdf6c024e.jpg'
        })]);
    });
};
