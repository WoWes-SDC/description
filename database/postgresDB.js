/* eslint-disable no-console */
const pgp = require('pg-promise')(/* options */);

const db = pgp('postgres://postgres:password@localhost:5432/database');

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  });
