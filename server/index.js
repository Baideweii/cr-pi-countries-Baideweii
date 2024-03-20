const server = require("./src/server");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env
const createCountries = require("./createCountries.js"); 

conn.sync({ force: false }).then(async () => {
  await createCountries();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

