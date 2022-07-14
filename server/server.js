const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// Importing Routes
const authRoutes = require("./routes/auth");

const app = express();
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log(`Database connected successfully !`);
    })
    .catch((error) => {
        console.log(`Database connection error : ${error}`);
    });
// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
// Routes Middlewares
app.use("/api", authRoutes);
app.get("/api", (req, res) => {
    res.json({
        data: "Response from nodejs api",
    });
});
// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
