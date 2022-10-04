const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const authRoute = require('./routes/auth');
const transactionRoute = require('./routes/transaction');

// settings
const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/transaction", transactionRoute);

// mongodb connection
mongoose.connect(process.env.MONGODB_URI);

// server listening
app.listen(port, () => console.log("Server listening to", port));

// routes
app.get("/", (req, res) => {
  res.send("Seja bem-vindo à API do Expanses Tracker - Todos os direitos reservados [Eduardo Melo]");
});
