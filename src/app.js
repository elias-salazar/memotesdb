const express = require("express");
const db = require("./utils/database");
const initModels = require("./models/initModels");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

initModels();
db.authenticate()
  .then(() => console.log("autenticacion exitosa"))
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => console.log("sincronizado correctamente"))
  .catch((error) => console.log(error));
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "bienvenido al servidor" });
});

app.listen(PORT, () => {
  console.log(`server corriendo en puerto ${PORT}`);
});
