const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, listAll } = require("../controllers/product");
router.post("/product", create);
router.get("/products/:count", listAll);
module.exports = router;
