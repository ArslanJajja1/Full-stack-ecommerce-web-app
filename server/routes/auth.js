const express = require("express");
const router = express.Router();
// Importing route controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth");
const { authCheck } = require("../middlewares/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);

module.exports = router;
