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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    console.log (`Found ${result.rowCount} person(s) by the name '${input}':`);
    const obj = result.rows;
    console.log(`- ${obj[0].id}: ${obj[0].first_name} ${obj[0].last_name}, born ${obj[0].birthdate.toLocaleDateString()}`);
    client.end();
  });
});

const input = process.argv[2];
