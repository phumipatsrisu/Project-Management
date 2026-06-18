require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/product"));

connectDB();
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Example on port ${PORT}!`));
