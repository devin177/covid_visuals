exports.up = function (knex) {
  return knex.schema.createTable("Cases", function (table) {
    table.increments("id").notNullable().primary();
    table.string("county");
    table.string("totalcountconfirmed");
    table.string("totalcountdeaths");
    table.string("newcountconfirmed");
    table.string("newcountdeaths");
    table.string("date");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("Cases");
};
