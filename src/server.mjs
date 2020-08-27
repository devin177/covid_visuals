import express from 'express';
import getData from './controller/data.js';
import bodyParser from 'body-parser';
import cors from "cors";
import knex from './db/knex.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/hey', (req, res) => res.send('ho!'));

app.get('/api/data', getData);

app.get('/', async (req, res) => {
  const result = await knex("Cases")
    .select("*")
    .where(
      {
        county: `${req.query.county}`,
        date: "2020-08-25"
      }
    )
  console.log(result);
  res.json(result);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
})
