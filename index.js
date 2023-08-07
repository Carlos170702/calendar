const express = require("express");
const cors = require("cors");
const { db_conection } = require("./database/config");
require("dotenv").config();

// crear el servidor de express
const app = express();

// database
db_conection();

// cors
app.use(cors());
// directorio publico
app.use(express.static("public"));
// lectura y parcer
app.use(express.json());

// rutas
//Todo auth: user
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//Todo events: calendar events

// escuchar peticiones
app.listen(process.env.PORT, (e) => {
  console.log(`listening on port  ${process.env.PORT}`);
});
