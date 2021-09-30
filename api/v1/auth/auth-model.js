const db = require("../../../data/dbConfig");

async function add(newUser) {
  const [userID] = await db("users as u").insert(newUser, "userID");

  return findByUserId(userID);
}

async function findByUserId(userID) {
  const user = await db("users as u")
    .select("userID", "firstname", "lastname", "email", "isPremium")
    .where("userID", userID)
    .first();

  return user;
}

function findByEmail(email) {
  return db("users").select("*").where("email", email).first();
}

module.exports = {
  add,
  findByUserId,
  findByEmail,
};
