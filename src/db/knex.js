const Knex = require('knex');
const knexConfig = require ('../../knexfile.js');
require('dotenv').config();

const knex = Knex(knexConfig[process.env.NODE_ENV]);
module.exports = knex;
