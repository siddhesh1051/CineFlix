const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Started Successfully on ${PORT}`);
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("error");
  });

app.use(
  cors({
    // origin: ["https://cineflix-pro.onrender.com"],
    // origin: ["https://cineflix-pro.vercel.app"],
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World render 2");
});
// app.use("/favorite",  require('./routes/favorite'));

