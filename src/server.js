const { createServer } = require("https");
const fs = require("fs");

require("dotenv").config();

const app = require("./app");

const server = createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
