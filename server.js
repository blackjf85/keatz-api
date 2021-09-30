const server = require("./api/app");
require("dotenv").config();

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log("Keatz API up and running!");
});
