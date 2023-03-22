const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const app = express();
app.use(express.json());
const jsonPath = path.resolve("./files/users.json");

app.get("/users", async (req, res) => {
  const jsonFile = await fs.readFile(jsonPath, "utf-8");
  res.send(jsonFile);
});
app.post("/users", async (req, res) => {
  const user = req.body;
  console.log(user);
  //leo el arreglo
  const usersArray = JSON.parse(await fs.readFile(jsonPath, "utf-8"));
  //agrego el user
  //genero nuevo id
  const lastIndex = usersArray.length - 1;
  const newId = lastIndex > 0 ? usersArray[lastIndex].id + 1 : 1;

  usersArray.push({ ...user, id: newId });
  await fs.writeFile(jsonPath, JSON.stringify(usersArray));
  console.log(lastIndex);
  res.end();
});
app.put("/users", async (req, res) => {
  const { id, score } = req.body;
  const usersArray = JSON.parse(await fs.readFile(jsonPath, "utf-8"));
  const userIndex = usersArray.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    usersArray[userIndex].score = score;
  }
  await fs.writeFile(jsonPath, JSON.stringify(usersArray));
  res.send("puntuaje actualizado");
});
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server en puerto ${PORT}`);
});

app.delete("/users", async (req, res) => {
  const usersArray = JSON.parse(await fs.readFile(jsonPath, "utf-8"));
  const { id } = req.body;
  const userIndex = usersArray.findIndex((user) => user.id === id);
  usersArray.splice(userIndex, 1);
  await fs.writeFile(jsonPath, JSON.stringify(usersArray));
  res.end();
});
