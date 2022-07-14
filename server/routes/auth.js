const express = require("express");
const router = express.Router();

router.get("/create-or-update-user", (req, res) => {
    res.json({ data: "Hi 👋 from create-or-updata user api" });
});

module.exports = router;
