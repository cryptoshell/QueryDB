const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

// Takes in 3 command-line arguments
const firstName = process.argv[2];
const lastName = process.argv[3];
const birthdate = process.argv[4];


// INSERTS to TABLE and terminates instance
knex('famous_people')
.insert({first_name: firstName, last_name: lastName, birthdate: birthdate})
.asCallback((err, rows) => {
  if (err) return console.error("error running query", err);
  knex.destroy();
});
