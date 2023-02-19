require("dotenv").config({ path: "file.env" });
const express = require("express");
const mongoose = require("mongoose");
const uri = `mongodb+srv://Nayan:${process.env.DB_PASS}@cluster0.xwwmfqh.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
});

const app = express();

//middleware
app.use(express.json());
const playerRouter = require("./routes/playerRoutes.js");
const teamRouter = require("./routes/teamRoutes");
app.use("/player", playerRouter);
app.use("/team", teamRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
