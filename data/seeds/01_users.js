const bcrypt = require("bcryptjs");
require("dotenv").config();

const { EMAIL } = process.env;
const { PASSWORD } = process.env;
const { ROUNDS } = process.env;

const hash = bcrypt.hashSync(PASSWORD, Number(ROUNDS));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: EMAIL,
          firstname: "Jeremy",
          lastname: "Black",
          password: hash,
          isPremium: true,
        },
      ]);
    });
};
