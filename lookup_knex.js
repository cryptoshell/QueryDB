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

// Logs results of query to terminal
function logResult(rows) {
  console.log("Searching ...");
    console.log (`Found ${rows.length} person(s) by the name '${input}':`);
    rows.forEach( (row) => { // Loops through all results and logs it to terminal
      console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate.toLocaleDateString()}`);
    });
}

// Command-line arguments
const input = process.argv[2];

// Knex query
knex('famous_people')
.where('first_name', 'like', input)
.orWhere('last_name', 'like', input)
.asCallback((err, rows) => {
  if (err) return console.error("error running query", err);
  logResult(rows); // Calls function to log results
  knex.destroy();
});
