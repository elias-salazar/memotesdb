const db = require("../utils/database");
const Users = require("../models/users.models");
const initModels = require("../models/initModels");

initModels();
const users = [
  { username: "elias", password: "eli123as", score: "0.1" },
  { username: "pablo", password: "pab123lo", score: "19.2" },
  { username: "benja", password: "ben123ja", score: "2.45" },
];

db.sync({ force: false })
  .then(() => {
    console.log("iniciando la plantacion de datos");
    users.forEach((user) => Users.create(user));
  })
  .catch((error) => console.log(error));
