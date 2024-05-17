const pg = require('pg');

const connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
});

