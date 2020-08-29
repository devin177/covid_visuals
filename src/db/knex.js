const Knex = require('knex');
const knexConfig = require ('../../knexfile.js');

const knex = Knex(knexConfig['development']);
module.exports = knex;
