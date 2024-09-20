"use strict";

const express = require("express");
const app = express();
const cors = require("cors")

require("dotenv").config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "127.0.0.1";

app.use(cors())
app.use(express.json());
require("express-async-errors");


// Routes:



app.use(require("./app/errorHandler"));

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  }
});
