const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// Logs results of query to terminal
function logResult(result) {
  console.log("Searching ...");
    console.log (`Found ${result.rowCount} person(s) by the name '${input}':`);
    const obj = result.rows;
    obj.forEach( (row) => { // Loops through all results and logs it to terminal
      console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate.toLocaleDateString()}`);
    });
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    logResult(result); // Calls function to log results
    client.end();
  });
});

const input = process.argv[2];
