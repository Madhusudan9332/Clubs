const express = require("express");
const mongoose = require("mongoose");
const puppeteer = require('puppeteer');
const ClubsRoutes = require("./router/clubs");

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("Error DB connection"));


app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: "Api is working"
  })
});
app.use(ClubsRoutes)
app.listen(10000, () => console.log(`Server is up and running at port 10000`));