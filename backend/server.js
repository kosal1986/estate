require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || "3500";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect to mongoDb");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
