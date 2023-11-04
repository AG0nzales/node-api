const express = require("express");

// npm library for generating random data
const { Sequelize } = require("sequelize");

// pass in postgres environment variable
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

const app = express();
app.use(express.json());

const PORT = 8080;

const dataList = [];

app.get("/data", (req, res) => {
  res.status(200).send(dataList);
  return;
});

app.post("/data", (req, res) => {
  let data = req.body;
  dataList.push(data);
  res.status(201).send(data);
  return;
});

app.listen(PORT, () => {
  try {
    sequelize.authenticate();
    console.log("Connection successful to the database");
  } catch (error) {
    console.log("Connection unsuccessful to the database", error);
  }
  console.log(`Server is listening on port ${PORT}`);
});
