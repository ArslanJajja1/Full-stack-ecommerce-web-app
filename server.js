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
    console.log(`Database connected successfully!`);
  })
  .catch((error) => {
    console.log(`Database connection error: ${error}`);
  });

// Middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

// Route Middlewares
fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

// Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(app.get('env'));
});
