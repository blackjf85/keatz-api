const server = require("./api/server");
require("dotenv").config();

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log("Keatz API up and running!");
});

//
