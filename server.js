const server = require("./api/app");
require("dotenv").config();

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log("Server up and running!");
});
