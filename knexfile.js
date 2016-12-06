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
