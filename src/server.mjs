import express from 'express';
import getData from './controller/data.js';
const app = express();
import knex from './db/knex.js';

app.get('/hey', (req, res) => res.send('ho!'));

app.get('/api/data', getData);

app.get('/', async (req, res) => {
  const result = await knex("Cases")
    .select("newcountconfirmed")
    .where({county: 'San Francisco'});
  res.json(result);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
})
