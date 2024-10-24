const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'Tonkisa69',
  password: '123456',
  database: 'Users'
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error('Connection error', err.stack))
  .finally(() => client.end());

