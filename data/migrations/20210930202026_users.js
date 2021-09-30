exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("userID");
    tbl.text("email").unique().notNullable();
    tbl.text("firstname", 128).notNullable();
    tbl.text("lastname", 128).notNullable();
    tbl.text("password").notNullable();
    tbl.boolean("isPremium").defaultTo("false");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
