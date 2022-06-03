const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
app.use(express.static(path.resolve(__dirname, "../app/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../app/dist", "index.html"));
});

app.get("/MapboxAPIkey", (req, res) => {
  res.json({ key: process.env.MAPBOX_APIKEY });
});

app.get("/GeoAPIkey", (req, res) => {
  res.json({ key: process.env.GEO_APIKEY });
});

app.get("*", (req, res) => {
  res.status(404).send("404 not found");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
