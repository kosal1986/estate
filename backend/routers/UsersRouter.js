const express = require("express");
const router = express.Router();
const getAllUser = require("../controllers/usersController");

router.get("/", getAllUser);

module.exports = router;
