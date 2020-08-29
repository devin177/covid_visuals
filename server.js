const dotenv = require('dotenv');
const express = require('express');
const getData = require("./src/controller/data");
const bodyParser =  require('body-parser');
const cors = require("cors");
const knex = require('./src/db/knex.js');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Ping the db to get covid data
app.get('/api/data', getData);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// serve the react app
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
