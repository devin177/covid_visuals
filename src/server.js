const express = require('express');
const getData = require("./controller/data");
const bodyParser =  require('body-parser');
const cors = require("cors");
const knex = require('./db/knex.js');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/hey', (req, res) => res.send('ho!'));

app.get('/api/data', getData);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/data', async (req, res) => {
  const result = await knex("Cases")
    .select("*")
    .where(
      {
        county: `${req.query.county}`,
        date: "2020-08-25"
      }
    )
  res.json(result);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
})
