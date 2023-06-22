const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();

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
app.use(bodyParser.json({ limit: '10mb' }));
const whitelist = ["http://localhost:3000","https://ecommerce-by-arslan.web.app"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))


// Route Middlewares
fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));
// Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(app.get('env'))
});
