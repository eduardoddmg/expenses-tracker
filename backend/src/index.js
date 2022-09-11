const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const authRoute = require('./routes/auth');
const contactRoute = require('./routes/contact');

// settings
const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);

// mongodb connection
mongoose.connect(process.env.MONGODB_URI);

// server listening
app.listen(port, () => console.log("Server listening to", port));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

