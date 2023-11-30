require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || "3500";
const databaseDb = require("./config/dbConnect");
const UsersRouter = require("./routers/UsersRouter");
const Signup = require("./routers/authRouters");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const corsOptions = ["http://localhost:3000"];

databaseDb();
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/users", UsersRouter);
app.use("/auth", Signup);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose.connection.once("open", () => {
  console.log("Connect to mongodb");
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
