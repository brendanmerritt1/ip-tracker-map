const express = require("express");
const cors = require("cors");
const path = require("path");
const port = 5000;
require("dotenv").config();

const app = express();
app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("/api/MapboxAPIkey", (req, res) => {
  res.json({ key: process.env.MAPBOX_APIKEY });
});

app.get("/api/GeoAPIkey", (req, res) => {
  res.json({ key: process.env.GEO_APIKEY });
});

app.get("*", (req, res) => {
  res.status(404).send("404 not found");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
