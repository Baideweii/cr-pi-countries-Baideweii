const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const createCountries = require("./createCountries.js"); 
const PORT = 3001;

conn.sync({ force: true }).then(async () => {
  //? Llamo a la funcion createCountries justo despues de que inicia el servidor
  await createCountries();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

